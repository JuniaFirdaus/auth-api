const ReplyRepository = require('../../Domains/replies/ReplyRepository');
const AddedReply = require('../../Domains/replies/entities/AddedReply');
const DetailedReply = require('../../Domains/replies/entities/DetailedReply');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addReply(addReply) {
    const {
      userId,
      commentId,
      content,
    } = addReply;

    const id = `reply-${this._idGenerator()}`;

    const result = await this._pool.query({
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5, $5) RETURNING id, content, owner',
      values: [id, commentId, userId, content, new Date()],
    });

    return new AddedReply({ ...result.rows[0] });
  }

  async getAllCommentReplies() {
    const result = await this._pool.query({
      text: `SELECT replies.id, users.username, replies.inserted_at, replies.content, replies.deleted_at,
      replies.comment_id
      FROM replies
      INNER JOIN users ON users.id = replies.owner
      ORDER BY replies.inserted_at ASC`,
      values: [],
    });

    return result.rows.map((comment) => new DetailedReply(comment));
  }

  async deleteReply(replyId) {
    await this._pool.query({
      text: 'UPDATE replies SET deleted_at = $1 WHERE id = $2',
      values: [new Date(), replyId],
    });
  }

  async verifyReplyOwner(replyId, owner) {
    const result = await this._pool.query({
      text: 'SELECT id FROM replies WHERE id = $1 AND owner = $2',
      values: [replyId, owner],
    });

    if (!result.rowCount) throw new AuthorizationError('Tidak dapat menghapus balasan komentar yang bukan milik Anda');
  }

  async verifyCommentReply(commentId, replyId) {
    const result = await this._pool.query({
      text: 'SELECT id FROM replies WHERE id = $1 AND comment_id = $2',
      values: [replyId, commentId],
    });

    if (!result.rowCount) throw new NotFoundError('Balasan pada komentar tidak ditemukan');
  }
}

module.exports = ReplyRepositoryPostgres;