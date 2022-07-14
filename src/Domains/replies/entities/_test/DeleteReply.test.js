const DeleteReply = require('../DeleteReply');

describe('a DeleteReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      userId: 'user-123',
      threadId: 'thread-123',
    };

    expect(() => new DeleteReply(payload)).toThrowError('DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      userId: 123,
      threadId: ['thread-123'],
      commentId: {},
      replyId: 'false',
    };

    expect(() => new DeleteReply(payload)).toThrowError('DELETE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create deleteReply object correctly', () => {
    const payload = {
      userId: 'user-123',
      threadId: 'thread-123',
      commentId: 'comment-123',
      replyId: 'reply-123',
    };

    const {
      userId,
      threadId,
      commentId,
      replyId,
    } = new DeleteReply(payload);

    expect(userId).toEqual(payload.userId);
    expect(threadId).toEqual(payload.threadId);
    expect(commentId).toEqual(payload.commentId);
    expect(replyId).toEqual(payload.replyId);
  });
});