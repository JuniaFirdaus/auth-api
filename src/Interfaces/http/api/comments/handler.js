const CommentThreadUseCase = require('../../../../Applications/use_case/CommentThreadUseCase');
const DomainErrorTranslator = require('../../../../Commons/exceptions/DomainErrorTranslator');


class CommentThreadHandler {
    constructor(container) {
        this._container = container;

        this.postCommentThreadHandler = this.postCommentThreadHandler.bind(this);
        this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
        this.likeOrDislikeCommentHandler = this.likeOrDislikeCommentHandler.bind(this);
    }

    async postCommentThreadHandler(request, h) {
        try {
            const commentThreadUseCase = this._container.getInstance(CommentThreadUseCase.name);
            const addedComment = await commentThreadUseCase.execute(
                {
                    ...request.payload,
                    ...request.params,
                    idUser: request.auth.credentials.id
                }
            );

            const response = h.response({
                status: 'success',
                data: {
                    addedComment,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            const translatedError = DomainErrorTranslator.translate(error);
            const response = h.response({
                status: 'fail',
                message: translatedError.message,
            });
            response.code(translatedError.statusCode);
            return response;
        }
    }

    async deleteCommentHandler(request, h) {
        const commentThreadUseCase = this._container.getInstance(CommentThreadUseCase.name);
        await commentThreadUseCase.deleteComment(
            {
                ...request.params,
                idUser: request.auth.credentials.id
            }
        );
        const response = h.response({
            status: 'success',
        });
        return response;

    }

    async likeOrDislikeCommentHandler(request, h) {
        const commentUseCase = this._container.getInstance(CommentThreadUseCase.name);
        await commentUseCase.likeOrDislikeComment({
            ...request.params,
            userId: request.auth.credentials.id,
        });

        const response = h.response({
            status: 'success',
        });
        return response;
    }
}

module.exports = CommentThreadHandler;