const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const DetailThread = require('../../Domains/threads/entities/DetailThread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
 
class ThreadRepositoryPostgres extends ThreadRepository {
    constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }
 
  async verifyId(id) {
    const query = {
      text: 'SELECT id FROM threads WHERE id = $1',
      values: [id],
    };
 
    const result = await this._pool.query(query);
 
    if (result.rowCount == 0) {
      throw new NotFoundError('id tidak tersedia');
    }
  }
 
  async addThread(addThread) {
    const { idUser, title, body } = addThread;
    const id = `thread-${this._idGenerator()}`;
    const dateNow = new Date();
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5, $5) RETURNING id, title, owner',
      values: [id, title, body, idUser, dateNow],
    };
 
    const result = await this._pool.query(query);
    return new AddedThread({ ...result.rows[0] });
  }

  async getDetailThread(threadId) {
    const result = await this._pool.query({
      text: `SELECT threads.id, threads.title, threads.body, threads.inserted_at, users.username 
      FROM threads
      INNER JOIN users ON users.id = threads.owner
      WHERE threads.id = $1`,
      values: [threadId],
    });

    if (!result.rowCount) throw new NotFoundError('thread tidak ditemukan');

    return new DetailThread({ ...result.rows[0] });
  }

}
 
module.exports = ThreadRepositoryPostgres;