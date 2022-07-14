const AddReply = require('../AddReply');

describe('an AddReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      content: 'a content',
    };

    expect(() => new AddReply(payload)).toThrowError('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      userId: 123,
      threadId: true,
      commentId: { key: 'value' },
      content: ['a content'],
    };

    expect(() => new AddReply(payload)).toThrowError('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addReply object correctly', () => {
    const payload = {
      userId: 'user-123',
      threadId: 'thread-123',
      commentId: 'comment-123',
      content: 'a reply to the comment',
    };

    const {
      userId,
      threadId,
      commentId,
      content,
    } = new AddReply(payload);

    expect(userId).toEqual(payload.userId);
    expect(threadId).toEqual(payload.threadId);
    expect(commentId).toEqual(payload.commentId);
    expect(content).toEqual(payload.content);
  });
});