class CommentLikeRepository {
    async isCommentsLiked(userId, commentId) {
      throw new Error('COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async likeComments(userId, commentId) {
      throw new Error('COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async disLikeComments(userId, commentId) {
      throw new Error('COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  }
  
  module.exports = CommentLikeRepository;