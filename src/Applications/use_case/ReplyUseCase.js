const AddReply = require('../../Domains/replies/entities/AddReply');
const DeleteReply = require('../../Domains/replies/entities/DeleteReply');

class ReplyUseCase {
  constructor({ commentRepository, replyRepository }) {
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async addReplyExec(useCasePayload) {
    const addReply = new AddReply(useCasePayload);

    await this._commentRepository.verifyThreadComments(
      useCasePayload.threadId,
      useCasePayload.commentId,
    );

    return this._replyRepository.addReply(addReply);
  }

  async deleteReplyExec(useCasePayload) {
    const deleteReply = new DeleteReply(useCasePayload);

    await this._replyRepository.verifyCommentReply(deleteReply.commentId, deleteReply.replyId);
    await this._replyRepository.verifyReplyOwner(deleteReply.replyId, deleteReply.userId);
    await this._replyRepository.deleteReply(deleteReply.replyId);
  }
}

module.exports = ReplyUseCase;