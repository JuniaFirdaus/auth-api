const AddComment = require('../../Domains/comments/entities/AddComment');
const DeleteComment = require('../../Domains/comments/entities/DeleteComment');

class CommentUseCase {
  constructor({ threadRepository, commentRepository, commentLikeRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._commentLikeRepository = commentLikeRepository;
  }

  async addCommentExec(useCasePayload) {
    const addComment = new AddComment(useCasePayload);

    await this._threadRepository.verifyId(addComment.threadId);

    return this._commentRepository.addComment(addComment);
  }

  async deleteCommentExec(useCasePayload) {
    const deleteComment = new DeleteComment(useCasePayload);

    await this._commentRepository.verifyThreadComments(
      deleteComment.threadId,
      deleteComment.commentId,
    );

    await this._commentRepository.verifyCommentOwner(deleteComment.commentId, deleteComment.userId);

    await this._commentRepository.deleteComment(deleteComment.commentId);
  }

  _verifyLikeDislikeCommentPayload({ threadId, commentId }) {
    if (!threadId || !commentId) {
      throw new Error('LIKE_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof threadId !== 'string' || typeof commentId !== 'string') {
      throw new Error('LIKE_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  async likeDislikeCommentExec(useCasePayload) {
    this._verifyLikeDislikeCommentPayload(useCasePayload);

    await this._commentRepository.verifyThreadComments(
      useCasePayload.threadId, useCasePayload.commentId,
    );

    const isLiked = await this._commentLikeRepository.isCommentsLiked(
      useCasePayload.userId, useCasePayload.commentId,
    );
    if (isLiked) {
      return this._commentLikeRepository.disLikeComments(
        useCasePayload.userId, useCasePayload.commentId,
      );
    }

    return this._commentLikeRepository.likeComments(
      useCasePayload.userId, useCasePayload.commentId,
    );
  }
}

module.exports = CommentUseCase;