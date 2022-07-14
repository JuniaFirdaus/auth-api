class DeleteReply {
    constructor(payload) {
      this._verifyPayload(payload);
  
      const {
        userId,
        threadId,
        commentId,
        replyId,
      } = payload;
  
      this.userId = userId;
      this.threadId = threadId;
      this.commentId = commentId;
      this.replyId = replyId;
    }
  
    _verifyPayload({ threadId, commentId, replyId }) {
      if (!commentId || !threadId || !replyId) {
        throw new Error('DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if (typeof commentId !== 'string' || typeof threadId !== 'string' || typeof replyId !== 'string') {
        throw new Error('DELETE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
    }
  }
  
  module.exports = DeleteReply;