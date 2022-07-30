const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const CommentLikesTableTestHelper = require('../../../../tests/CommentLikesTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const CommentsLikeRepositoryPostgres = require('../CommentLikeRepositoryPostgress');

describe('CommentsLikeRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({});
    await ThreadsTableTestHelper.addThread({});
    await CommentTableTestHelper.addComment({});
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentTableTestHelper.cleanTable();
    await CommentLikesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('isCommentLike function', () => {
    const payload = {
      commentId: 'comment-123',
      userId: 'user-123',
    };

    it('should return true if comment was liked', async () => {
      const commentLikeRepository = new CommentsLikeRepositoryPostgres(pool);

      await CommentLikesTableTestHelper.addLike({});

      expect(await commentLikeRepository.isCommentLike(payload.userId, payload.commentId))
        .toEqual(true);
    });

    it('should return false if comment was does not liked', async () => {
      const commentLikeRepository = new CommentsLikeRepositoryPostgres(pool);

      expect(await commentLikeRepository.isCommentLike(payload.userId, payload.commentId))
        .toEqual(false);
    });
  });

  describe('likeComment function', () => {
    const payload = {
      commentId: 'comment-123',
      userId: 'user-123',
    };

    it('should persist like a comment', async () => {
      const commentLikeRepository = new CommentsLikeRepositoryPostgres(pool);

      await commentLikeRepository.likeComment(payload.userId, payload.commentId);

      const like = await CommentLikesTableTestHelper
        .findUserCommentLike(payload.commentId, payload.userId);
      expect(like).toHaveLength(1);
    });
  });

  describe('disLikeComment function', () => {
    const payload = {
      commentId: 'comment-123',
      userId: 'user-123',
    };

    it('should persist dislike a comment', async () => {
      const commentLikeRepository = new CommentsLikeRepositoryPostgres(pool);
      await CommentLikesTableTestHelper.addLike({});

      await commentLikeRepository.disLikeComment(payload.userId, payload.commentId);

      const like = await CommentLikesTableTestHelper
        .findUserCommentLike(payload.commentId, payload.userId);
      expect(like).toHaveLength(0);
    });
  });
});