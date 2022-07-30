const pool = require('../../database/postgres/pool');
const ThreadTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const CommentLikesTableTestHelper = require('../../../../tests/CommentLikesTableTestHelper');

const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddCommentThread = require('../../../Domains/comments/entities/AddCommentThread');
const AddedCommentThread = require('../../../Domains/comments/entities/AddedCommentThread');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgress');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const DetailComment = require('../../../Domains/comments/entities/DetailComment');

describe('CommentRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({});
    await ThreadTableTestHelper.addThread({});
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await ThreadTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('AddCommentThread function', () => {

    it('should return added thread correctly', async () => {
      // Arrange
      const addCommentThread = new AddCommentThread({
        idUser: 'user-123',
        content: 'ini content',
        threadId: 'thread-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedComment = await threadRepositoryPostgres.addComment(addCommentThread);

      // Assert
      expect(addedComment).toStrictEqual(new AddedCommentThread({
        id: 'comment-123',
        content: addCommentThread.content,
        owner: addCommentThread.idUser,
      }));
    });
  });

  describe('verifyThreadComments function', () => {
    const fakeIdGenerator = () => '123'; // stub!
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
    const fakeIdGenerator = () => '123'; // stub!
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

  describe('deleteComment function', () => {
    const fakeIdGenerator = () => '123'; // stub!
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
    const fakeIdGenerator = () => '123'; // stub!
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
    const fakeIdGenerator = () => '123'; // stub!
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

  describe('getComments function', () => {
    const fakeIdGenerator = () => '123'; // stub!
    const threadId = 'thread-123';

    it('should return empty array when comment not exists on the thread', async () => {
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      const comments = await commentRepository.getComments(threadId);

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

      const comments = await commentRepository.getComments(threadId);

      expect(comments).toHaveLength(2);
      expect(comments[0]).toStrictEqual(new DetailComment(
        {
          id: 'comment-234',
          username: 'dicoding',
          content: 'deleted content',
          inserted_at: '2021-12-22T20:42:14.859+07:00',
          deleted_at: '2021-12-22T21:42:14.859+07:00',
          likes: '0',
        },
      ));
      expect(comments[1]).toStrictEqual(new DetailComment(
        {
          id: 'comment-123',
          username: 'dicoding',
          content: 'ini content',
          inserted_at: '2022-07-26T10:01:32+0000',
          deleted_at: null,
          likes: '1',
        },
      ));
    });
  });

});