class AddThread {
    constructor(payload) {
        this._verifyPayload(payload);

        const { idUser, title, body } = payload;
        this.idUser = idUser;
        this.title = title;
        this.body = body;
    }

    _verifyPayload({ title, body }) {
        if (!title || !body) {
            throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof title !== 'string' || typeof body !== 'string') {
            throw new Error('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

    }

}

module.exports = AddThread;