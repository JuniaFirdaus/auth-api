/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentLikesTableTestHelper = {
  async addLike({
    commentId = 'comment-123',
    userId = 'user-123',
    insertedAt = '2022-07-26T10:01:32+0000',
  }) {
    const query = {
      text: 'INSERT INTO comments_like VALUES($1, $2, $3)',
      values: [userId, commentId, insertedAt],
    };

    await pool.query(query);
  },

  async findUserCommentLike(commentId, userId) {
    const result = await pool.query({
      text: 'SELECT * FROM comments_like WHERE user_id = $1 AND comment_id = $2',
      values: [userId, commentId],
    });

    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments_like WHERE 1=1');
  },
};

module.exports = CommentLikesTableTestHelper;