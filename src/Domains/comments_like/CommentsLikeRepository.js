class CommentLikeRepository {
    async isCommentLike(userId, commentId) {
      throw new Error('COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async likeComment(userId, commentId) {
      throw new Error('COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async disLikeComment(userId, commentId) {
      throw new Error('COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  }
  
  module.exports = CommentLikeRepository;