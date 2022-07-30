const DetailThreadComment = require('../DetailThreadComment');

describe('a DetailThreadComment entities', () => {
    it('should throw error when detailedComment is not an array', () => {
        const payloadThread = {
            id: 'thread-123',
            title: 'ini title',
            body: 'ini body',
            inserted_at: '2022-07-26T10:01:32+0000',
            date: '2021-12-22T07:22:23.775Z',
            username: 'dicoding',
        };

        const payloadComments = {};

        expect(() => new DetailThreadComment(payloadThread, payloadComments)).toThrowError('DETAIL_THREAD_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create detailedThread object correctly', () => {
        const payloadThread = {
            id: 'thread-123',
            title: 'ini title',
            body: 'ini body',
            inserted_at: '2022-07-26T10:01:32+0000',
            date: '2021-12-22T07:22:23.775Z',
            username: 'dicoding',
        };

        const payloadComments = [
            {
                id: 'comment-123',
                username: 'dicoding 3',
                date: '2022-08-26T10:01:32+0000',
                content: '**komentar telah dihapus**',
            },
            {
                id: 'comment-456',
                username: 'dicoding 3',
                date: '2022-09-26T10:01:32+0000',
                content: 'ini content',
            },
        ];

        const {
            id,
            title,
            body,
            date,
            username,
            comments,
        } = new DetailThreadComment(payloadThread, payloadComments);

        expect(id).toEqual(payloadThread.id);
        expect(title).toEqual(payloadThread.title);
        expect(body).toEqual(payloadThread.body);
        expect(date).toEqual(payloadThread.date);
        expect(username).toEqual(payloadThread.username);
        expect(comments).toHaveLength(2);
        expect(comments).toStrictEqual([
            {
                id: payloadComments[0].id,
                username: payloadComments[0].username,
                date: payloadComments[0].date,
                content: '**komentar telah dihapus**',
            },
            {
                id: payloadComments[1].id,
                username: payloadComments[1].username,
                date: payloadComments[1].date,
                content: payloadComments[1].content,
            },
        ]);
    });
});