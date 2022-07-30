const ThreadTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const DetailThread = require('../../../Domains/threads/entities/DetailThread');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');

describe('ThreadRepositoryPostgres', () => {
    beforeEach(async () => {
        await UsersTableTestHelper.addUser({});
    });


    afterEach(async () => {
        await ThreadTableTestHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addThread function', () => {

        it('should persist add thread', async () => {
            // Arrange
            const addThread = new AddThread({
                idUser: 'user-123',
                title: 'ini title',
                body: 'ini body',
            });
            const fakeIdGenerator = () => '123'; // stub!
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            await threadRepositoryPostgres.addThread(addThread);

            // Assert
            const threads = await ThreadTableTestHelper.findThreadById('thread-123');
            expect(threads).toHaveLength(1);
        });

        it('should return added thread correctly', async () => {
            // Arrange
            const addThread = new AddThread({
                idUser: 'user-123',
                title: 'ini title',
                body: 'ini body',
            });
            const fakeIdGenerator = () => '123'; // stub!
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            const addedThread = await threadRepositoryPostgres.addThread(addThread);

            // Assert
            expect(addedThread).toStrictEqual(new AddedThread({
                id: 'thread-123',
                title: addThread.title,
                owner: addThread.idUser,
            }));
        });
    });

    describe('verifyId function', () => {
        const threadId = 'thread-123';
        const fakeIdGenerator = () => '123'; // stub!

        it('should throw NotFoundError if not valid id', async () => {
            const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            await expect(threadRepository.verifyId(threadId))
                .rejects.toThrow(NotFoundError);
        });

        it('should not throw NotFoundError if valid id', async () => {
            const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            await ThreadTableTestHelper.addThread({});

            await expect(threadRepository.verifyId(threadId))
                .resolves.not.toThrow(NotFoundError);
        });
    });

    describe('getDetailThread function', () => {
        const threadId = 'thread-123';
        const fakeIdGenerator = () => '123'; // stub!

        it('should throw NotFoundError if not valid id', async () => {
            const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            await expect(threadRepository.getDetailThread(threadId))
                .rejects.toThrow(NotFoundError);
        });

        it('should return detail thread correctly', async () => {
            const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
            
            await ThreadsTableTestHelper.addThread({});
            const thread = await threadRepository.getDetailThread(threadId);

            expect(thread).toStrictEqual(new DetailThread({
                id: threadId,
                title: 'ini title',
                body: 'ini body',
                inserted_at: '2022-07-26T10:01:32+0000',
                username: 'dicoding',
            }));
        });
    });
});