/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
  async addComment({
    id = 'comment-123',
    threadId = 'thread-123',
    owner = 'user-123',
    content = 'a content',
    insertedAt = '2021-12-22T22:42:14.859+07:00',
    deletedAt = null,
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $5, $6)',
      values: [id, threadId, owner, content, insertedAt, deletedAt],
    };

    await pool.query(query);
  },

  async findCommentById(id) {
    const result = await pool.query({
      text: 'SELECT * FROM comments WHERE id = $1 AND deleted_at IS NULL',
      values: [id],
    });

    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments WHERE 1=1');
  },
};

module.exports = CommentsTableTestHelper;