const pool = require('../../database/postgres/pool');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');

const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const DetailedComment = require('../../../Domains/comments/entities/DetailedComment');

const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');

const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const CommentLikesTableTestHelper = require('../../../../tests/CommentLikesTableTestHelper');

describe('CommentRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({});
    await ThreadsTableTestHelper.addThread({});
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentLikesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  const fakeIdGenerator = () => '123';

  describe('addComment function', () => {
    it('should persist add comment and return added comment correctly', async () => {
      const addComment = new AddComment({
        userId: 'user-123',
        content: 'a content',
        threadId: 'thread-123',
      });

      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await commentRepository.addComment(addComment);

      const comment = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(comment).toHaveLength(1);
    });

    it('should return added comment correctly', async () => {
      const addComment = new AddComment({
        userId: 'user-123',
        content: 'a content',
        threadId: 'thread-123',
      });

      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      const addedComment = await commentRepository.addComment(addComment);

      expect(addedComment).toStrictEqual(new AddedComment({
        id: 'comment-123',
        content: addComment.content,
        owner: addComment.userId,
      }));
    });
  });

  describe('deleteComment function', () => {
    it('should delete comment from database', async () => {
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      const commentId = 'comment-123';

      await CommentsTableTestHelper.addComment({});

      await commentRepository.deleteComment(commentId);

      const comment = await CommentsTableTestHelper.findCommentById(commentId);
      expect(comment).toHaveLength(0);
    });
  });

  describe('verifyThreadComments function', () => {
    it('should throw NotFoundError when thread comment not found', async () => {
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      const threadId = 'thread-123';
      const commentId = 'comment-123';

      await expect(commentRepository.verifyThreadComments(threadId, commentId))
        .rejects.toThrow(NotFoundError);
    });

    it('should not throw NotFoundError when thread comment exists', async () => {
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      const threadId = 'thread-123';
      const commentId = 'comment-123';

      await CommentsTableTestHelper.addComment({});

      await expect(commentRepository.verifyThreadComments(threadId, commentId))
        .resolves.not.toThrow(NotFoundError);
    });
  });

  describe('verifyCommentOwner function', () => {
    it('should throw AuthorizationError when not the owner of comment', async () => {
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      const commentId = 'comment-123';
      const owner = 'user-234';

      await CommentsTableTestHelper.addComment({});

      await expect(commentRepository.verifyCommentOwner(commentId, owner))
        .rejects.toThrow(AuthorizationError);
    });

    it('should not throw AuthorizationError when owned the comment', async () => {
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      const commentId = 'comment-123';
      const owner = 'user-123';

      await CommentsTableTestHelper.addComment({});

      await expect(commentRepository.verifyCommentOwner(commentId, owner))
        .resolves.not.toThrow(AuthorizationError);
    });
  });

  describe('getAllCommentByThreadId function', () => {
    const threadId = 'thread-123';

    it('should return empty array when comment not exists on the thread', async () => {
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      const comments = await commentRepository.getAllCommentByThreadId(threadId);

      expect(comments).toStrictEqual([]);
    });

    it('should return array of comments correctly', async () => {
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      await CommentsTableTestHelper.addComment({
        id: 'comment-234',
        content: 'deleted content',
        insertedAt: '2021-12-22T20:42:14.859+07:00',
        deletedAt: '2021-12-22T21:42:14.859+07:00',
      });
      await CommentsTableTestHelper.addComment({});
      await CommentLikesTableTestHelper.addLike({});

      const comments = await commentRepository.getAllCommentByThreadId(threadId);

      expect(comments).toHaveLength(2);
      expect(comments[0]).toStrictEqual(new DetailedComment(
        {
          id: 'comment-234',
          username: 'dicoding',
          content: 'deleted content',
          inserted_at: '2021-12-22T20:42:14.859+07:00',
          deleted_at: '2021-12-22T21:42:14.859+07:00',
          likes: '0',
        },
      ));
      expect(comments[1]).toStrictEqual(new DetailedComment(
        {
          id: 'comment-123',
          username: 'dicoding',
          content: 'a content',
          inserted_at: '2021-12-22T22:42:14.859+07:00',
          deleted_at: null,
          likes: '1',
        },
      ));
    });
  });
});