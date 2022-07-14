class DetailedThreadComments {
    constructor(detailedThread, detailedComment) {
      const {
        id, title, body, date, username,
      } = detailedThread;
  
      if (!Array.isArray(detailedComment)) throw new Error('DETAILED_THREAD_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  
      this.id = id;
      this.title = title;
      this.body = body;
      this.date = date;
      this.username = username;
      this.comments = detailedComment;
    }
  }
  
  module.exports = DetailedThreadComments;