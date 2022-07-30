const DetailComment = require('../DetailComment');

describe('a detail comment entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            username: 'dicoding',
            inserted_at: '2021-12-23T07:22:23.775Z',
            content: 'ini content',
            deleted_at: '2021-12-23T07:23:23.775Z',
        };

        // Action and Assert
        expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payloadComments did not meet data type specification', () => {
        const payloadComments = {
            id: true,
            username: 'dicoding',
            inserted_at: '2021-12-23T07:22:23.775Z',
            content: 'ini content',
            deleted_at: '2021-12-23T07:23:23.775Z',
            likes: 2,
        };

        expect(() => new DetailComment(payloadComments)).toThrowError('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
    
    it('should create detailedComments object correctly', () => {
        const payloadComments = {
            id: 'comment-123',
            username: 'dicoding',
            inserted_at: '2021-12-23T07:22:23.775Z',
            content: 'ini content',
            deleted_at: '2021-12-23T07:23:23.775Z',
            likes: '2',
        };

        const {
            id, username, content, date, likeCount,
        } = new DetailComment(payloadComments);

        expect(id).toEqual(payloadComments.id);
        expect(username).toEqual(payloadComments.username);
        expect(content).toEqual('**komentar telah dihapus**');
        expect(date).toEqual(payloadComments.inserted_at);
        expect(likeCount).toEqual(0);
    });
});