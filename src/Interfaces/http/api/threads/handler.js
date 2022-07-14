const ThreadUseCase = require('../../../../Applications/use_case/ThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadDetailHandler = this.getThreadDetailHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const threadUseCase = this._container.getInstance(ThreadUseCase.name);
    const addedThread = await threadUseCase.addThreadExec({
      ...request.payload,
      userId: request.auth.credentials.id,
    });

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async getThreadDetailHandler(request, h) {
    const threadUseCase = this._container.getInstance(ThreadUseCase.name);
    const thread = await threadUseCase.getThreadDetailExec(request.params);

    const response = h.response({
      status: 'success',
      data: {
        thread,
      },
    });
    return response;
  }
}

module.exports = ThreadsHandler;