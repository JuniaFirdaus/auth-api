const AddCommentThread = require('../AddCommentThread');
 
describe('a CommentThreads entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'ini content',
    };
 
    // Action and Assert
    expect(() => new AddCommentThread(payload)).toThrowError('COMMENTS_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      idUser: 123,
      threadId: true,
      content: ['ini content'],
    };

    expect(() => new AddCommentThread(payload)).toThrowError('COMMENTS_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create commentThread object correctly', () => {
    const payload = {
      idUser: 'user-123',
      threadId: 'thread-123',
      content: 'ini content',
    };

    const { idUser, threadId, content } = new AddCommentThread(payload);

    expect(idUser).toEqual(payload.idUser);
    expect(threadId).toEqual(payload.threadId);
    expect(content).toEqual(payload.content);
  });

});