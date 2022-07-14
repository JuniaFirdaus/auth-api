const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const CommentLikesTableTestHelper = require('../../../../tests/CommentLikesTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');

const CommentLikeRepositoryPostgres = require('../CommentLikeRepositoryPostgres');

describe('CommentLikeRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({});
    await ThreadsTableTestHelper.addThread({});
    await CommentsTableTestHelper.addComment({});
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await CommentLikesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('isCommentsLiked function', () => {
    const payload = {
      commentId: 'comment-123',
      userId: 'user-123',
    };

    it('should return true if comment was liked', async () => {
      const commentLikeRepository = new CommentLikeRepositoryPostgres(pool);

      await CommentLikesTableTestHelper.addLike({});

      expect(await commentLikeRepository.isCommentsLiked(payload.userId, payload.commentId))
        .toEqual(true);
    });

    it('should return false if comment was does not liked', async () => {
      const commentLikeRepository = new CommentLikeRepositoryPostgres(pool);

      expect(await commentLikeRepository.isCommentsLiked(payload.userId, payload.commentId))
        .toEqual(false);
    });
  });

  describe('likeComments function', () => {
    const payload = {
      commentId: 'comment-123',
      userId: 'user-123',
    };

    it('should persist like a comment', async () => {
      const commentLikeRepository = new CommentLikeRepositoryPostgres(pool);

      await commentLikeRepository.likeComments(payload.userId, payload.commentId);

      const like = await CommentLikesTableTestHelper
        .findUserCommentLike(payload.commentId, payload.userId);
      expect(like).toHaveLength(1);
    });
  });

  describe('disLikeComments function', () => {
    const payload = {
      commentId: 'comment-123',
      userId: 'user-123',
    };

    it('should persist dislike a comment', async () => {
      const commentLikeRepository = new CommentLikeRepositoryPostgres(pool);
      await CommentLikesTableTestHelper.addLike({});

      await commentLikeRepository.disLikeComments(payload.userId, payload.commentId);

      const like = await CommentLikesTableTestHelper
        .findUserCommentLike(payload.commentId, payload.userId);
      expect(like).toHaveLength(0);
    });
  });
});