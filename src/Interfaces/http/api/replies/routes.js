const routes = (handler) => ([
    {
      method: 'POST',
      path: '/threads/{threadId}/comments/{commentId}/replies',
      handler: handler.postReplyHandler,
      options: {
        auth: 'forumApiService',
      },
    },
    {
      method: 'DELETE',
      path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
      handler: handler.deleteReplyHandler,
      options: {
        auth: 'forumApiService',
      },
    },
  ]);
  
  module.exports = routes;