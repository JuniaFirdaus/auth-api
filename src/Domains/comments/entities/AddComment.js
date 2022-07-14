class AddComment {
    constructor(payload) {
      this._verifyPayload(payload);
  
      const { userId, content, threadId } = payload;
  
      this.userId = userId;
      this.content = content;
      this.threadId = threadId;
    }
  
    _verifyPayload({ content, threadId }) {
      if (!content || !threadId) {
        throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if (typeof content !== 'string' || typeof threadId !== 'string') {
        throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
    }
  }
  
  module.exports = AddComment;