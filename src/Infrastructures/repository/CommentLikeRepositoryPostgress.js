const CommentsLikeRepository = require('../../Domains/comments_like/CommentsLikeRepository');

class CommentsLikeRepositoryPostgres extends CommentsLikeRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async isCommentLike(userId, commentId) {
    const result = await this._pool.query({
      text: 'SELECT * FROM comments_like WHERE comment_id = $1 AND user_id = $2',
      values: [commentId, userId],
    });

    if (!result.rowCount) return false;

    return true;
  }

  async likeComment(userId, commentId) {
    await this._pool.query({
      text: 'INSERT INTO comments_like VALUES($1, $2, $3)',
      values: [userId, commentId, new Date()],
    });
  }

  async disLikeComment(userId, commentId) {
    await this._pool.query({
      text: 'DELETE FROM comments_like WHERE user_id = $1 AND comment_id = $2',
      values: [userId, commentId],
    });
  }
}

module.exports = CommentsLikeRepositoryPostgres;