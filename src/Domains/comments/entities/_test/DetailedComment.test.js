const DetailedComment = require('../DetailedComment');

describe('a DetailedComment entities', () => {
  it('should throw error when payloadComments did not contain needed property', () => {
    const payloadComments = {
      username: 'vedoalfarizi',
      inserted_at: '2021-12-23T07:22:23.775Z',
      content: 'a deleted comment',
      deleted_at: '2021-12-23T07:23:23.775Z',
    };

    expect(() => new DetailedComment(payloadComments)).toThrowError('DETAILED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payloadComments did not meet data type specification', () => {
    const payloadComments = {
      id: true,
      username: 'vedoalfarizi',
      inserted_at: '2021-12-23T07:22:23.775Z',
      content: 'a deleted comment',
      deleted_at: '2021-12-23T07:23:23.775Z',
      likes: 2,
    };

    expect(() => new DetailedComment(payloadComments)).toThrowError('DETAILED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create detailedComments object correctly', () => {
    const payloadComments = {
      id: 'comment-123',
      username: 'vedoalfarizi',
      inserted_at: '2021-12-23T07:22:23.775Z',
      content: 'a deleted comment',
      deleted_at: '2021-12-23T07:23:23.775Z',
      likes: '2',
    };

    const {
      id, username, content, date, likeCount,
    } = new DetailedComment(payloadComments);

    expect(id).toEqual(payloadComments.id);
    expect(username).toEqual(payloadComments.username);
    expect(content).toEqual('**komentar telah dihapus**');
    expect(date).toEqual(payloadComments.inserted_at);
    expect(likeCount).toEqual(0);
  });
});