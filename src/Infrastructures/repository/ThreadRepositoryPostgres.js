const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const DetailedThread = require('../../Domains/threads/entities/DetailedThread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(addThread) {
    const { userId, title, body } = addThread;
    const id = `thread-${this._idGenerator()}`;
    const dateNow = new Date();

    const result = await this._pool.query({
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5, $5) RETURNING id, title, owner',
      values: [id, title, body, userId, dateNow],
    });

    return new AddedThread({ ...result.rows[0] });
  }

  async verifyId(id) {
    const result = await this._pool.query({
      text: 'SELECT id FROM threads WHERE id = $1',
      values: [id],
    });

    if (!result.rowCount) throw new NotFoundError('thread tidak ditemukan');
  }

  async getDetailById(threadId) {
    const result = await this._pool.query({
      text: `SELECT threads.id, threads.title, threads.body, threads.inserted_at, users.username 
      FROM threads
      INNER JOIN users ON users.id = threads.owner
      WHERE threads.id = $1`,
      values: [threadId],
    });

    if (!result.rowCount) throw new NotFoundError('thread tidak ditemukan');

    return new DetailedThread({ ...result.rows[0] });
  }
}

module.exports = ThreadRepositoryPostgres;