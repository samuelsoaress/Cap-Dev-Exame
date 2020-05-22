const appUse = require('../services/app.use');
const post = require('../controllers/answers/post');
const cors = require('cors')


module.exports = (app) => {
  app.options('*', cors())
  app.post('/answers', cors(), post.handler);
  appUse.appUse(app);
};