const CommentThreadHandler = require('./handler');
const routes = require('./routes');
 
module.exports = {
  name: 'comments',
  register: async (server, { container }) => {
    const commentHandler = new CommentThreadHandler(container);
    server.route(routes(commentHandler));
  },
};