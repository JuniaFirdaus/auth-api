class DetailedComment {
    constructor(payload) {
      this._verifyPayload(payload);
  
      const {
        id, username, inserted_at, content, deleted_at, likes,
      } = payload;
  
      this.id = id;
      this.username = username;
      this.date = inserted_at;
  
      if (deleted_at) {
        this.content = '**komentar telah dihapus**';
        this.likeCount = 0;
      } else {
        this.content = content;
        this.likeCount = parseInt(likes, 10);
      }
    }
  
    _verifyPayload({
      id, username, content, inserted_at, likes,
    }) {
      if (!id || !username || !content || !inserted_at || !likes) {
        throw new Error('DETAILED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if ([typeof id, typeof username, typeof content, typeof inserted_at, typeof likes]
        .some((type) => type !== 'string')) {
        throw new Error('DETAILED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
    }
  }
  
  module.exports = DetailedComment;