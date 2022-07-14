/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const RepliesTableTestHelper = {
  async addReply({
    id = 'reply-123',
    commentId = 'comment-123',
    owner = 'user-123',
    content = 'a reply to the comment',
    insertedAt = '2021-12-22T22:42:14.859+07:00',
    deletedAt = null,
  }) {
    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5, $5, $6)',
      values: [id, commentId, owner, content, insertedAt, deletedAt],
    };

    await pool.query(query);
  },

  async findReplyById(id) {
    const result = await pool.query({
      text: 'SELECT * FROM replies WHERE id = $1 AND deleted_at IS NULL',
      values: [id],
    });

    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM replies WHERE 1=1');
  },
};

module.exports = RepliesTableTestHelper;