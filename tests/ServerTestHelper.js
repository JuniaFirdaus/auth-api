/* istanbul ignore file */

const Jwt = require('@hapi/jwt');
const UsersTableTestHelper = require('./UsersTableTestHelper');

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

};

module.exports = ServerTestHelper;