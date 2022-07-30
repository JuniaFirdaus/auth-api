const AddCommentThread = require('../../Domains/comments/entities/AddCommentThread');
const DeleteCommentThread = require('../../Domains/comments/entities/DeleteCommentThread');
 
class CommentThreadUseCase {
  constructor({ threadRepository, commentRepository, commentLikeRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._commentLikeRepository = commentLikeRepository;
  }
 
  async execute(useCasePayload) {
    const addComment = new AddCommentThread(useCasePayload);
    
    await this._threadRepository.verifyId(addComment.threadId);

    return this._commentRepository.addComment(addComment);
  }

  async deleteComment(useCasePayload) {

    const deleteComment = new DeleteCommentThread(useCasePayload);

    await this._commentRepository.verifyThreadComments(
      deleteComment.threadId,
      deleteComment.commentId,
    );

    await this._commentRepository.verifyCommentOwner(deleteComment.commentId, deleteComment.idUser);

    await this._commentRepository.deleteComment(deleteComment.commentId);
  }

  _verifyLikeOrDislikeCommentPayload({ threadId, commentId }) {
    if (!threadId || !commentId) {
      throw new Error('LIKE_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof threadId !== 'string' || typeof commentId !== 'string') {
      throw new Error('LIKE_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  async likeOrDislikeComment(useCasePayload) {
    this._verifyLikeOrDislikeCommentPayload(useCasePayload);

    await this._commentRepository.verifyThreadComments(
      useCasePayload.threadId, useCasePayload.commentId,
    );

    const isLiked = await this._commentLikeRepository.isCommentLike(
      useCasePayload.userId, useCasePayload.commentId,
    );
    if (isLiked) {
      return this._commentLikeRepository.disLikeComment(
        useCasePayload.userId, useCasePayload.commentId,
      );
    }

    return this._commentLikeRepository.likeComment(
      useCasePayload.userId, useCasePayload.commentId,
    );
  }

}
 
module.exports = CommentThreadUseCase;