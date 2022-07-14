class AddReply {
    constructor(payload) {
      this._verifyPayload(payload);
  
      const {
        userId,
        threadId,
        commentId,
        content,
      } = payload;
  
      this.userId = userId;
      this.threadId = threadId;
      this.commentId = commentId;
      this.content = content;
    }
  
    _verifyPayload({ content, threadId, commentId }) {
      if (!content || !threadId || !commentId) {
        throw new Error('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if (typeof content !== 'string' || typeof threadId !== 'string' || typeof commentId !== 'string') {
        throw new Error('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
    }
  }
  
  module.exports = AddReply;