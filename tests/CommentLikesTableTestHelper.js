/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentLikesTableTestHelper = {
  async addLike({
    commentId = 'comment-123',
    userId = 'user-123',
    insertedAt = '2021-12-22T22:42:14.859+07:00',
  }) {
    const query = {
      text: 'INSERT INTO comment_likes VALUES($1, $2, $3)',
      values: [userId, commentId, insertedAt],
    };

    await pool.query(query);
  },

  async findUserCommentLike(commentId, userId) {
    const result = await pool.query({
      text: 'SELECT * FROM comment_likes WHERE user_id = $1 AND comment_id = $2',
      values: [userId, commentId],
    });

    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comment_likes WHERE 1=1');
  },
};

module.exports = CommentLikesTableTestHelper;