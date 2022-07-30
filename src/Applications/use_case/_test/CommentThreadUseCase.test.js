const AddCommentThread = require('../../../Domains/comments/entities/AddCommentThread');
const AddedCommentThread = require('../../../Domains/comments/entities/AddedCommentThread');

const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

const CommentThreadUseCase = require('../CommentThreadUseCase');
const CommentLikeRepository = require('../../../Domains/comments_like/CommentsLikeRepository');

describe('CommentThreadUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      idUser: 'user-123',
      threadId: 'thread-123',
      content: 'ini content',
    };
    const expectedCommentThread = new AddedCommentThread({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: useCasePayload.idUser,
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.verifyId = jest.fn(() => Promise.resolve());
    mockCommentRepository.addComment = jest.fn(() => Promise.resolve(expectedCommentThread));

    /** creating use case instance */
    const getCommentThreadUseCase = new CommentThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      commentLikeRepository: {},
    });

    // Action
    const addedCommentThread = await getCommentThreadUseCase.execute(useCasePayload);

    // Assert
    expect(addedCommentThread).toStrictEqual(expectedCommentThread);
    expect(mockCommentRepository.addComment).toBeCalledWith(new AddCommentThread({
      idUser: useCasePayload.idUser,
      threadId: useCasePayload.threadId,
      content: useCasePayload.content,
    }));
  });

  describe('deleteComment function', () => {
    it('should orchestrating the delete comment action correctly', async () => {
      const useCasePayload = {
        idUser: 'user-123',
        threadId: 'thread-123',
        commentId: 'comment-123',
      };

      const mockCommentRepository = new CommentRepository();
      const mockThreadRepository = new ThreadRepository();

      mockCommentRepository.verifyThreadComments = jest.fn(() => Promise.resolve());
      mockCommentRepository.verifyCommentOwner = jest.fn(() => Promise.resolve());
      mockCommentRepository.deleteComment = jest.fn(() => Promise.resolve());

      const commentUseCase = new CommentThreadUseCase({
        threadRepository: mockThreadRepository,
        commentRepository: mockCommentRepository,
        commentLikeRepository: {},
      });

      await commentUseCase.deleteComment(useCasePayload);

      expect(mockCommentRepository.verifyThreadComments)
        .toBeCalledWith(useCasePayload.threadId, useCasePayload.commentId);

      expect(mockCommentRepository.verifyCommentOwner)
        .toBeCalledWith(useCasePayload.commentId, useCasePayload.idUser);

      expect(mockCommentRepository.deleteComment)
        .toBeCalledWith(useCasePayload.commentId);
    });
  });

  describe('likeOrDislikeComment function', () => {
    it('should orchestrating the like comment action correctly', async () => {
      const useCasePayload = {
        userId: 'user-123',
        threadId: 'thread-123',
        commentId: 'comment-123',
      };

      const mockCommentRepository = new CommentRepository();
      const mockThreadRepository = new ThreadRepository();
      const mockCommentLikeRepository = new CommentLikeRepository();

      mockCommentRepository.verifyThreadComments = jest.fn(() => Promise.resolve());
      mockCommentLikeRepository.isCommentLike = jest.fn(() => Promise.resolve(false));
      mockCommentLikeRepository.likeComment = jest.fn(() => Promise.resolve());

      const commentUseCase = new CommentThreadUseCase({
        threadRepository: mockThreadRepository,
        commentRepository: mockCommentRepository,
        commentLikeRepository: mockCommentLikeRepository,
      });

      await commentUseCase.likeOrDislikeComment(useCasePayload);

      expect(mockCommentRepository.verifyThreadComments)
        .toBeCalledWith(useCasePayload.threadId, useCasePayload.commentId);
      expect(mockCommentLikeRepository.isCommentLike)
        .toBeCalledWith(useCasePayload.userId, useCasePayload.commentId);
      expect(mockCommentLikeRepository.likeComment)
        .toBeCalledWith(useCasePayload.userId, useCasePayload.commentId);
    });

    it('should orchestrating the dislike comment action correctly', async () => {
      const useCasePayload = {
        userId: 'user-123',
        threadId: 'thread-123',
        commentId: 'comment-123',
      };

      const mockCommentRepository = new CommentRepository();
      const mockThreadRepository = new ThreadRepository();
      const mockCommentLikeRepository = new CommentLikeRepository();

      mockCommentRepository.verifyThreadComments = jest.fn(() => Promise.resolve());
      mockCommentLikeRepository.isCommentLike = jest.fn(() => Promise.resolve(true));
      mockCommentLikeRepository.disLikeComment = jest.fn(() => Promise.resolve());

      const commentUseCase = new CommentThreadUseCase({
        threadRepository: mockThreadRepository,
        commentRepository: mockCommentRepository,
        commentLikeRepository: mockCommentLikeRepository,
      });

      await commentUseCase.likeOrDislikeComment(useCasePayload);

      expect(mockCommentRepository.verifyThreadComments)
        .toBeCalledWith(useCasePayload.threadId, useCasePayload.commentId);
      expect(mockCommentLikeRepository.isCommentLike)
        .toBeCalledWith(useCasePayload.userId, useCasePayload.commentId);
      expect(mockCommentLikeRepository.disLikeComment)
        .toBeCalledWith(useCasePayload.userId, useCasePayload.commentId);
    });

    it('shoud return error cause not contrain needed property', async () => {
      const useCasePayload = {
        inValid: '',
      };

      const commentUseCase = new CommentThreadUseCase({
        threadRepository: {},
        commentRepository: {},
        commentLikeRepository: {},
      });

      await expect(commentUseCase.likeOrDislikeComment(useCasePayload)).rejects.toThrowError('LIKE_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('shoud return error cause not meet data type spec', async () => {
      const useCasePayload = {
        threadId: [0],
        commentId: { key: 'value' },
        userId: true,
      };

      const commentUseCase = new CommentThreadUseCase({
        threadRepository: {},
        commentRepository: {},
        commentLikeRepository: {},
      });

      await expect(commentUseCase.likeOrDislikeComment(useCasePayload)).rejects.toThrowError('LIKE_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
  });

});
