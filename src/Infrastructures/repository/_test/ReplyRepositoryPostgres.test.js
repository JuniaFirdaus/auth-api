const pool = require('../../database/postgres/pool');

const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');

const AddReply = require('../../../Domains/replies/entities/AddReply');
const AddedReply = require('../../../Domains/replies/entities/AddedReply');
const DetailedReply = require('../../../Domains/replies/entities/DetailedReply');

const ReplyRepositoryPostgres = require('../ReplyRepositoryPostgres');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('ReplyRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({});
    await ThreadsTableTestHelper.addThread({});
    await CommentsTableTestHelper.addComment({});
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await RepliesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  const fakeIdGenerator = () => '123';

  describe('addReply function', () => {
    it('should persist add reply and return added reply correctly', async () => {
      const addReply = new AddReply({
        userId: 'user-123',
        threadId: 'thread-123',
        commentId: 'comment-123',
        content: 'a reply to the comment',
      });

      const replyRepository = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      const addedReply = await replyRepository.addReply(addReply);
      const reply = await RepliesTableTestHelper.findReplyById('reply-123');

      expect(reply).toHaveLength(1);
      expect(addedReply).toStrictEqual(new AddedReply({
        id: 'reply-123',
        content: addedReply.content,
        owner: addedReply.owner,
      }));
    });
  });

  describe('getAllCommentReplies function', () => {
    it('should return empty array when replies not exists', async () => {
      const replyRepository = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      const replies = await replyRepository.getAllCommentReplies();

      expect(replies).toStrictEqual([]);
    });

    it('should return array of replies correctly', async () => {
      const replyRepository = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      await RepliesTableTestHelper.addReply({
        id: 'reply-234',
        content: 'deleted reply',
        insertedAt: '2021-12-22T20:42:14.859+07:00',
        deletedAt: '2021-12-22T21:42:14.859+07:00',
      });
      await RepliesTableTestHelper.addReply({});

      const replies = await replyRepository.getAllCommentReplies();

      expect(replies).toHaveLength(2);
      expect(replies[0]).toStrictEqual(new DetailedReply(
        {
          id: 'reply-234',
          comment_id: 'comment-123',
          username: 'dicoding',
          content: 'deleted content',
          inserted_at: '2021-12-22T20:42:14.859+07:00',
          deleted_at: '2021-12-22T21:42:14.859+07:00',
        },
      ));
      expect(replies[1]).toStrictEqual(new DetailedReply(
        {
          id: 'reply-123',
          comment_id: 'comment-123',
          username: 'dicoding',
          content: 'a reply to the comment',
          inserted_at: '2021-12-22T22:42:14.859+07:00',
          deleted_at: null,
        },
      ));
    });
  });

  describe('deleteReply function', () => {
    it('should delete reply from database', async () => {
      const replyRepository = new ReplyRepositoryPostgres(pool, fakeIdGenerator);
      const replyId = 'reply-123';

      await RepliesTableTestHelper.addReply({});

      await replyRepository.deleteReply(replyId);

      const reply = await RepliesTableTestHelper.findReplyById(replyId);
      expect(reply).toHaveLength(0);
    });
  });

  describe('verifyReplyOwner function', () => {
    it('should throw AuthorizationError when not the owner of reply', async () => {
      const replyRepository = new ReplyRepositoryPostgres(pool, fakeIdGenerator);
      const replyId = 'reply-123';
      const owner = 'user-234';

      await RepliesTableTestHelper.addReply({});

      await expect(replyRepository.verifyReplyOwner(replyId, owner))
        .rejects.toThrow(AuthorizationError);
    });

    it('should not throw AuthorizationError when owned the reply', async () => {
      const replyRepository = new ReplyRepositoryPostgres(pool, fakeIdGenerator);
      const replyId = 'reply-123';
      const owner = 'user-123';

      await RepliesTableTestHelper.addReply({});

      await expect(replyRepository.verifyReplyOwner(replyId, owner))
        .resolves.not.toThrow(AuthorizationError);
    });
  });

  describe('verifyCommentReply function', () => {
    it('should throw NotFoundError when comment reply not found', async () => {
      const replyRepository = new ReplyRepositoryPostgres(pool, fakeIdGenerator);
      const commentId = 'comment-123';
      const replyId = 'reply-123';

      await expect(replyRepository.verifyCommentReply(commentId, replyId))
        .rejects.toThrow(NotFoundError);
    });

    it('should not throw NotFoundError when comment reply exists', async () => {
      const replyRepository = new ReplyRepositoryPostgres(pool, fakeIdGenerator);
      const commentId = 'comment-123';
      const replyId = 'reply-123';

      await RepliesTableTestHelper.addReply({});

      await expect(replyRepository.verifyCommentReply(commentId, replyId))
        .resolves.not.toThrow(NotFoundError);
    });
  });
});