const ThreadUseCase = require('../../../../Applications/use_case/ThreadUseCase');
const DomainErrorTranslator = require('../../../../Commons/exceptions/DomainErrorTranslator');


class ThreadHandler {
    constructor(container) {
        this._container = container;

        this.postThreadHandler = this.postThreadHandler.bind(this);
        this.getDetailThreadHandler = this.getDetailThreadHandler.bind(this);
    }

    async postThreadHandler(request, h) {
        try {
            const threadUseCase = this._container.getInstance(ThreadUseCase.name);
            const addedThread = await threadUseCase.execute({ ...request.payload, idUser: request.auth.credentials.id });

            const response = h.response({
                status: 'success',
                data: {
                    addedThread,
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

    async getDetailThreadHandler(request, h) {
        try {
            const threadUseCase = this._container.getInstance(ThreadUseCase.name);
            const thread = await threadUseCase.getDetailThread(request.params);

            const response = h.response({
                status: 'success',
                data: {
                    thread,
                },
            });
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
}

module.exports = ThreadHandler;