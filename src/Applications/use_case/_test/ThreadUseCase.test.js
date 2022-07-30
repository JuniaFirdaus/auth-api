const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const ThreadUseCase = require('../ThreadUseCase');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const DetailThreadComment = require('../../../Domains/threads/entities/DetailThreadComment');

describe('ThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      idUser: 'thread-123',
      title: 'ini title',
      body: 'ini body',
    };
    const expectedAddedThread = new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: useCasePayload.idUser,
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedThread));

    /** creating use case instance */
    const getThreadUseCase = new ThreadUseCase({
      threadRepository: mockThreadRepository
    });

    // Action
    const addedThread = await getThreadUseCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread({
      idUser: useCasePayload.idUser,
      title: useCasePayload.title,
      body: useCasePayload.body,
    }));
  });

  describe('getThreadDetails function', () => {
    it('should orchestrating the get thread details action correctly', async () => {
      const useCasePayload = {
        threadId: 'thread-123',
      };

      const expectedThreadResponse = {
        id: useCasePayload.threadId,
        title: 'ini title',
        body: 'ini body',
        date: '2022-07-26T10:01:32+0000',
        username: 'dicoding',
      };

      const expectedCommentResponse = [
        {
          id: 'comment-123',
          username: 'dicoding',
          date: '2022-07-26T10:01:32+0000',
          content: '**komentar telah dihapus**',
        },
        {
          id: 'comment-456',
          username: 'dicoding',
          date: '2022-07-26T10:01:32+0000',
          content: 'ini content',
        },
      ];

      const expectedResponse = new DetailThreadComment(
        expectedThreadResponse,
        expectedCommentResponse,
      );

      const mockThreadRepository = new ThreadRepository();
      const mockCommentRepository = new CommentRepository();

      mockThreadRepository.getDetailThread = jest.fn(() => Promise.resolve(expectedThreadResponse));
      mockCommentRepository.getComments = jest
        .fn(() => Promise.resolve(expectedCommentResponse));
  
      const threadUseCase = new ThreadUseCase({
        threadRepository: mockThreadRepository,
        commentRepository: mockCommentRepository,
      });

      const detailedThread = await threadUseCase.getDetailThread(useCasePayload);

      expect(detailedThread).toStrictEqual(expectedResponse);
      expect(mockThreadRepository.getDetailThread).toBeCalledWith(useCasePayload.threadId);
      expect(mockCommentRepository.getComments)
        .toBeCalledWith(useCasePayload.threadId);
    });

    it('shoud return error cause not contrain needed property', async () => {
      const useCasePayload = {
        inValid: '',
      };

      const threadUseCase = new ThreadUseCase({
        threadRepository: {},
        commentRepository: {},
      });

      await expect(threadUseCase.getDetailThread(useCasePayload)).rejects.toThrowError('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('shoud return error cause not meet data type spec', async () => {
      const useCasePayload = {
        threadId: true,
      };

      const threadUseCase = new ThreadUseCase({
        threadRepository: {},
        commentRepository: {},
      });

      await expect(threadUseCase.getDetailThread(useCasePayload)).rejects.toThrowError('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
  });

});