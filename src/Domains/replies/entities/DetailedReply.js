class DetailedReply {
    constructor(payload) {
      this._verifyPayload(payload);
  
      const {
        id, comment_id, username, inserted_at, content, deleted_at,
      } = payload;
  
      this.id = id;
      this.commentId = comment_id;
      this.username = username;
      this.date = inserted_at;
      this.content = deleted_at === null ? content : '**balasan telah dihapus**';
    }
  
    _verifyPayload({
      id, comment_id, username, content, inserted_at,
    }) {
      if (!id || !comment_id || !username || !content || !inserted_at) {
        throw new Error('DETAILED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if ([typeof id, typeof comment_id, typeof username, typeof content, typeof inserted_at]
        .some((type) => type !== 'string')) {
        throw new Error('DETAILED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
    }
  }
  
  module.exports = DetailedReply;