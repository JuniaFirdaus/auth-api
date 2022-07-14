const AddThread = require('../AddThread');

describe('an AddThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      title: 'a title',
    };

    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      userId: 'user-id',
      title: 123,
      body: true,
    };

    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addThread object correctly', () => {
    const payload = {
      userId: 'user-id',
      title: 'a title',
      body: 'a body that related to the title',
    };

    const { userId, title, body } = new AddThread(payload);

    expect(userId).toEqual(payload.userId);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
  });
});