const AddedCommentThread = require('../AddedCommentThread');

describe('a addedCommentThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            content: 'ini content',
            owner: 'owner-id',
        };

        // Action and Assert
        expect(() => new AddedCommentThread(payload)).toThrowError('COMMENTS_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 123,
            content: ['a content'],
            owner: true,
          };

        // Action and Assert
        expect(() => new AddedCommentThread(payload)).toThrowError('COMMENTS_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create addedCommentThread object correctly', () => {
        // Arrange
        const payload = {
            id: 'comment-123',
            content: 'a content',
            owner: 'owner-id',
          };

        // Action
        const addedCommentThread = new AddedCommentThread(payload);

        // Assert
        expect(addedCommentThread.id).toEqual(payload.id);
        expect(addedCommentThread.title).toEqual(payload.title);
        expect(addedCommentThread.body).toEqual(payload.body);
    });
});