const DetailedThreadComments = require('../DetailedThreadComments');

describe('a DetailedThreadComments entities', () => {
  it('should throw error when detailedComment is not an array', () => {
    const payloadThread = {
      id: 'thread-123',
      title: 'a title',
      body: 'a body that related to the title',
      date: '2021-12-22T07:22:23.775Z',
      username: 'dicoding',
    };

    const payloadComments = {};

    expect(() => new DetailedThreadComments(payloadThread, payloadComments)).toThrowError('DETAILED_THREAD_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create detailedThread object correctly', () => {
    const payloadThread = {
      id: 'thread-123',
      title: 'a title',
      body: 'a body that related to the title',
      date: '2021-12-22T07:22:23.775Z',
      username: 'dicoding',
    };

    const payloadComments = [
      {
        id: 'comment-123',
        username: 'vedoalfarizi',
        date: '2021-12-23T07:22:23.775Z',
        content: '**komentar telah dihapus**',
      },
      {
        id: 'comment-456',
        username: 'vedoalfarizi',
        date: '2021-12-23T07:25:23.775Z',
        content: 'a comment',
      },
    ];

    const {
      id,
      title,
      body,
      date,
      username,
      comments,
    } = new DetailedThreadComments(payloadThread, payloadComments);

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