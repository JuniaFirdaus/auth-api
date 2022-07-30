class AddCommentThread {
    constructor(payload) {
        this._verifyPayload(payload);

        const { idUser, threadId, content } = payload;
        this.idUser = idUser;
        this.content = content;
        this.threadId = threadId;
    }

    _verifyPayload({ idUser, threadId, content }) {
        if (!idUser || !threadId) {
            throw new Error('COMMENTS_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof threadId !== 'string' || typeof content !== 'string') {
            throw new Error('COMMENTS_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

    }

}

module.exports = AddCommentThread;