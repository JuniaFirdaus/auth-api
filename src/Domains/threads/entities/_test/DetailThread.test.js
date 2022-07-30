const DetailThread = require('../DetailThread');

describe('a DetailThread entities', () => {
  it('should throw error when payloadThread did not contain needed property', () => {
    const payloadThread = {};

    expect(() => new DetailThread(payloadThread)).toThrowError('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payloadThread did not meet data type specification', () => {
    const payloadThread = {
      id: 'thread-123',
      title: 'ini title',
      body: 'ini body',
      inserted_at: '2022-07-26T10:01:32+0000',
      username: true,
    };

    expect(() => new DetailThread(payloadThread)).toThrowError('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create detailedThread object correctly', () => {
    const payloadThread = {
      id: 'thread-123',
      title: 'ini title',
      body: 'ini body',
      inserted_at: '2022-07-26T10:01:32+0000',
      username: 'dicoding',
    };

    const {
      id,
      title,
      body,
      date,
      username,
    } = new DetailThread(payloadThread);

    expect(id).toEqual(payloadThread.id);
    expect(title).toEqual(payloadThread.title);
    expect(body).toEqual(payloadThread.body);
    expect(date).toEqual(payloadThread.inserted_at);
    expect(username).toEqual(payloadThread.username);
  });
});