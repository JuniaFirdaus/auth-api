class ReplyRepository {
    async addReply(addReply) {
      throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async getAllCommentReplies() {
      throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async deleteReply(replyId) {
      throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async verifyReplyOwner(replyId, owner) {
      throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async verifyCommentReply(commentId, replyId) {
      throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  }
  
  module.exports = ReplyRepository;