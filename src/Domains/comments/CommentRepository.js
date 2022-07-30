class CommentRepository {
    async addComment(addComment) {
      throw new Error('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
    async deleteComment(commentId) {
      throw new Error('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async verifyThreadComments(threadId, commentId) {
      throw new Error('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async verifyCommentOwner(commentId, owner) {
      throw new Error('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async getComments(threadId) {
      throw new Error('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

  }
   
  module.exports = CommentRepository;