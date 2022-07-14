const CommentLikeRepository = require('../../Domains/comment_likes/CommentLikeRepository');

class CommentLikeRepositoryPostgres extends CommentLikeRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async isCommentsLiked(userId, commentId) {
    const result = await this._pool.query({
      text: 'SELECT * FROM comment_likes WHERE comment_id = $1 AND user_id = $2',
      values: [commentId, userId],
    });

    if (!result.rowCount) return false;

    return true;
  }

  async likeComments(userId, commentId) {
    await this._pool.query({
      text: 'INSERT INTO comment_likes VALUES($1, $2, $3)',
      values: [userId, commentId, new Date()],
    });
  }

  async disLikeComments(userId, commentId) {
    await this._pool.query({
      text: 'DELETE FROM comment_likes WHERE user_id = $1 AND comment_id = $2',
      values: [userId, commentId],
    });
  }
}

module.exports = CommentLikeRepositoryPostgres;