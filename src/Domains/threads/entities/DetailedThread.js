class DetailedThread {
    constructor(payload) {
      this._verifyPayload(payload);
  
      const {
        id, title, body, inserted_at, username,
      } = payload;
  
      this.id = id;
      this.title = title;
      this.body = body;
      this.date = inserted_at;
      this.username = username;
    }
  
    _verifyPayload({
      id, title, body, inserted_at, username,
    }) {
      if (!id || !title || !body || !inserted_at || !username) {
        throw new Error('DETAILED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if ([typeof id, typeof title, typeof body, typeof inserted_at, typeof username]
        .some((type) => type !== 'string')) {
        throw new Error('DETAILED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
    }
  }
  
  module.exports = DetailedThread;