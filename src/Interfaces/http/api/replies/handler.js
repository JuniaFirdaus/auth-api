const ReplyUseCase = require('../../../../Applications/use_case/ReplyUseCase');

class RepliesHandler {
  constructor(container) {
    this._container = container;

    this.postReplyHandler = this.postReplyHandler.bind(this);
    this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
  }

  async postReplyHandler(request, h) {
    const replyUseCase = this._container.getInstance(ReplyUseCase.name);
    const addedReply = await replyUseCase.addReplyExec({
      ...request.payload,
      ...request.params,
      userId: request.auth.credentials.id,
    });

    const response = h.response({
      status: 'success',
      data: {
        addedReply,
      },
    });
    response.code(201);
    return response;
  }

  async deleteReplyHandler(request, h) {
    const replyUseCase = this._container.getInstance(ReplyUseCase.name);
    await replyUseCase.deleteReplyExec({
      ...request.params,
      userId: request.auth.credentials.id,
    });

    const response = h.response({
      status: 'success',
    });
    return response;
  }
}

module.exports = RepliesHandler;