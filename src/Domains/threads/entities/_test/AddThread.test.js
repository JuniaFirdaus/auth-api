const AddThread = require("../AddThread");

 
describe('a AddThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'ini title',
    };
 
    // Action and Assert
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
      idUser: 'ini id',
      title: 'ini title',
      body: 'ini body',
    };

    const { idUser, title, body } = new AddThread(payload);

    expect(idUser).toEqual(payload.idUser);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
  });

});