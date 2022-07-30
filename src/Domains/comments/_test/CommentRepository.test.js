const CommentRepository = require('../CommentRepository');

describe('ThreadRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const commentRepository = new CommentRepository();

    // Action and Assert
    await expect(commentRepository.addComment({})).rejects.toThrowError('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentRepository.deleteComment('')).rejects.toThrowError('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentRepository.verifyThreadComments('', '')).rejects.toThrowError('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentRepository.verifyCommentOwner('', '')).rejects.toThrowError('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentRepository.getComments('')).rejects.toThrowError('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
