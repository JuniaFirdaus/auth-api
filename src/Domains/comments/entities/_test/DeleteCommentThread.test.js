const DeleteCommentThread = require('../DeleteCommentThread');

describe('a DeleteComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      idUser: 'user-123',
    };

    expect(() => new DeleteCommentThread(payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      idUser: 123,
      threadId: ['thread-123'],
      commentId: {},
    };

    expect(() => new DeleteCommentThread(payload)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create deleteCommentThread object correctly', () => {
    const payload = {
      idUser: 'user-123',
      threadId: 'thread-123',
      commentId: 'comment-123',
    };

    const { idUser, threadId, commentId } = new DeleteCommentThread(payload);

    expect(idUser).toEqual(payload.idUser);
    expect(threadId).toEqual(payload.threadId);
    expect(commentId).toEqual(payload.commentId);
  });
});