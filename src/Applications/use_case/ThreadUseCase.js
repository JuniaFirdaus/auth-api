const AddThread = require('../../Domains/threads/entities/AddThread');
const DetailThreadComment = require('../../Domains/threads/entities/DetailThreadComment');
 
class ThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }
 
  async execute(useCasePayload) {
    const addThread = new AddThread(useCasePayload);
    return this._threadRepository.addThread(addThread);
  }

  _verifyDetailThreadPayload({ threadId }) {
    if (!threadId) throw new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');

    if (typeof threadId !== 'string') throw new Error('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  }

  async getDetailThread(useCasePayload) {

    this._verifyDetailThreadPayload(useCasePayload);

    const thread = await  this._threadRepository.getDetailThread(useCasePayload.threadId);
    const comments = await  this._commentRepository.getComments(useCasePayload.threadId);

    return new DetailThreadComment(thread, comments);
  }

}

 
module.exports = ThreadUseCase;