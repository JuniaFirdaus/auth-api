const AddComment = require('../AddComment');

describe('an AddComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      content: 'a content',
    };

    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      userId: 123,
      content: ['a content'],
      threadId: true,
    };

    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addComment object correctly', () => {
    const payload = {
      userId: 'user-123',
      content: 'a content',
      threadId: 'thread-123',
    };

    const { userId, content, threadId } = new AddComment(payload);

    expect(userId).toEqual(payload.userId);
    expect(content).toEqual(payload.content);
    expect(threadId).toEqual(payload.threadId);
  });
});