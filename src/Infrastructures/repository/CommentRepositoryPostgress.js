const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedCommentThread = require('../../Domains/comments/entities/AddedCommentThread');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const DetailCommentThread = require('../../Domains/comments/entities/DetailComment');
 
class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }
 
  async verifyThreadComments(threadId, commentId) {
    const result = await this._pool.query({
      text: 'SELECT id FROM comments WHERE id = $1 AND thread_id = $2',
      values: [commentId, threadId],
    });

    if (!result.rowCount) throw new NotFoundError('Komentar pada thread tidak ditemukan');
  }

  async verifyCommentOwner(commentId, owner) {
    const result = await this._pool.query({
      text: 'SELECT id FROM comments WHERE id = $1 AND owner = $2',
      values: [commentId, owner],
    });

    if (!result.rowCount) throw new AuthorizationError('Tidak dapat menghapus komentar yang bukan milik Anda');
  }
 
  async addComment(addComment) {    
    const { idUser, content, threadId } = addComment;
    const id = `comment-${this._idGenerator()}`;
    const dateNow = new Date();
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $5) RETURNING id, content, owner',
      values: [id, threadId, idUser, content, dateNow],
    };
 
    const result = await this._pool.query(query);
    return new AddedCommentThread({ ...result.rows[0] });
  }

  async deleteComment(commentId) {
    await this._pool.query({
      text: 'UPDATE comments SET deleted_at = $1 WHERE id = $2',
      values: [new Date(), commentId],
    });
  }

  async getComments(threadId) {
    const result = await this._pool.query({
      text: `SELECT comments.id, users.username, comments.inserted_at, comments.content, comments.deleted_at,
      COUNT(likes.comment_id) as likes
      FROM comments
      INNER JOIN users ON users.id = comments.owner
      LEFT JOIN comments_like AS likes ON likes.comment_id = comments.id
      WHERE comments.thread_id = $1
      GROUP BY comments.id, users.username
      ORDER BY comments.inserted_at ASC`,
      values: [threadId],
    });

    return result.rows.map((comment) => new DetailCommentThread(comment));
  }

}
 
module.exports = CommentRepositoryPostgres;