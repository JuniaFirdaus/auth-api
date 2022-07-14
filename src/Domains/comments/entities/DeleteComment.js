class DeleteComment {
    constructor(payload) {
      this._verifyPayload(payload);
  
      const { userId, threadId, commentId } = payload;
  
      this.userId = userId;
      this.threadId = threadId;
      this.commentId = commentId;
    }
  
    _verifyPayload({ threadId, commentId }) {
      if (!commentId || !threadId) {
        throw new Error('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if (typeof commentId !== 'string' || typeof threadId !== 'string') {
        throw new Error('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
    }
  }
  
  module.exports = DeleteComment;