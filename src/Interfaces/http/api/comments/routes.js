const routes = (handler) => ([
    {
      method: 'POST',
      path: '/threads/{threadId}/comments',
      handler: handler.postCommentThreadHandler,
      options: {
        auth: 'forumApiService',
      },
    },
    {
      method: 'DELETE',
      path: '/threads/{threadId}/comments/{commentId}',
      handler: handler.deleteCommentHandler,
      options: {
        auth: 'forumApiService',
      },
    },
    {
      method: 'PUT',
      path: '/threads/{threadId}/comments/{commentId}/likes',
      handler: handler.likeOrDislikeCommentHandler,
      options: {
        auth: 'forumApiService',
      },
    },
  ]);
   
  module.exports = routes;