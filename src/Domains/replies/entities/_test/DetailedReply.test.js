const DetailedReply = require('../DetailedReply');

describe('a DetailedReply entities', () => {
  it('should throw error when payloadReply did not contain needed property', () => {
    const payloadReply = {
      username: 'juniafirdaus',
      inserted_at: '2021-12-23T07:22:23.775Z',
      content: 'a deleted reply',
      deleted_at: '2021-12-23T07:23:23.775Z',
    };

    expect(() => new DetailedReply(payloadReply)).toThrowError('DETAILED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payloadReply did not meet data type specification', () => {
    const payloadReply = {
      id: true,
      comment_id: 'comment-123',
      username: 'juniafirdaus',
      inserted_at: '2021-12-23T07:22:23.775Z',
      content: 'a deleted reply',
      deleted_at: '2021-12-23T07:23:23.775Z',
    };

    expect(() => new DetailedReply(payloadReply)).toThrowError('DETAILED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create detailedReply object correctly', () => {
    const payloadReply = {
      id: 'reply-123',
      comment_id: 'comment-123',
      username: 'juniafirdaus',
      inserted_at: '2021-12-23T07:22:23.775Z',
      content: 'a deleted reply',
      deleted_at: '2021-12-23T07:23:23.775Z',
    };

    const {
      id, username, content, date, commentId,
    } = new DetailedReply(payloadReply);

    expect(id).toEqual(payloadReply.id);
    expect(commentId).toEqual(payloadReply.comment_id);
    expect(username).toEqual(payloadReply.username);
    expect(content).toEqual('**balasan telah dihapus**');
    expect(date).toEqual(payloadReply.inserted_at);
  });
});