/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
  async addComment({
    id = 'comment-123',
    idThread = 'thread-123',
    owner = 'user-123',
    content = 'ini content',
    insertedAt = '2022-07-26T10:01:32+0000',
    deletedAt = null,
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $5, $6)',
      values: [id, idThread, owner, content, insertedAt, deletedAt],
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