class DeleteCommentThread {
    constructor(payload){
        this._verifyPayload(payload);

        const { idUser, threadId, commentId } = payload;
        
        this.idUser = idUser;
        this.threadId = threadId;
        this.commentId = commentId;
    }

    _verifyPayload({ commentId, threadId }) {
        if (!commentId || !threadId) {
          throw new Error('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
        }
    
        if (typeof commentId !== 'string' || typeof threadId !== 'string') {
          throw new Error('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
      }
}

module.exports = DeleteCommentThread;
