/* istanbul ignore file */

const Jwt = require('@hapi/jwt');
const UsersTableTestHelper = require('./UsersTableTestHelper');
const ThreadsTableTestHelper = require('./ThreadsTableTestHelper');
const CommentsTableTestHelper = require('./CommentsTableTestHelper');

const ServerTestHelper = {
  async getAccessToken() {
    const userPayload = {
      id: 'user-123',
      username: 'dicoding',
    };

    const existingUser = await UsersTableTestHelper.findUsersById(userPayload.id);
    if (!existingUser.length) {
      await UsersTableTestHelper.addUser(userPayload);
    }

    return Jwt.token.generate(userPayload, process.env.ACCESS_TOKEN_KEY);
  },

  async addThreadComments() {
    await UsersTableTestHelper.addUser({});
    await UsersTableTestHelper.addUser({
      id: 'user-234',
      username: 'comentator',
      fullname: 'A Commentator',
    });

    await ThreadsTableTestHelper.addThread({});

    await CommentsTableTestHelper.addComment({
      owner: 'user-234',
      deletedAt: '2021-12-23T22:42:14.859+07:00',
    });

    await CommentsTableTestHelper.addComment({
      id: 'comment-234',
      owner: 'user-234',
      insertedAt: '2021-12-24T20:42:14.859+07:00',
    });
  },

};

module.exports = ServerTestHelper;