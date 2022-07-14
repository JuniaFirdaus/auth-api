const DetailedCommentsReplies = require('../../Domains/comments/entities/DetailedCommentsReplies');
const AddThread = require('../../Domains/threads/entities/AddThread');
const DetailedThreadComments = require('../../Domains/threads/entities/DetailedThreadComments');

class ThreadUseCase {
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async addThreadExec(useCasePayload) {
    const addThread = new AddThread(useCasePayload);

    return this._threadRepository.addThread(addThread);
  }

  _verifyThreadDetailPayload({ threadId }) {
    if (!threadId) throw new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');

    if (typeof threadId !== 'string') throw new Error('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  }

  async getThreadDetailExec(useCasePayload) {
    this._verifyThreadDetailPayload(useCasePayload);

    const [thread, comments, replies] = await Promise.all([
      this._threadRepository.getDetailById(useCasePayload.threadId),
      this._commentRepository.getAllCommentByThreadId(useCasePayload.threadId),
      this._replyRepository.getAllCommentReplies(),
    ]);

    const detailedComments = new DetailedCommentsReplies(comments, replies);

    return new DetailedThreadComments(thread, detailedComments.comments);
  }
}

module.exports = ThreadUseCase;