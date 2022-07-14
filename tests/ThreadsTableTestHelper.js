/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async addThread({
    id = 'thread-123',
    title = 'a title',
    body = 'a body that related to the title',
    owner = 'user-123',
    insertedAt = '2021-12-22T22:42:08.179+07:00',
  }) {
    await pool.query({
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5, $5)',
      values: [id, title, body, owner, insertedAt],
    });
  },

  async findThreadById(id) {
    const result = await pool.query({
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    });

    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
  },
};

module.exports = ThreadsTableTestHelper;