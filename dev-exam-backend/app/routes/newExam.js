const appUse = require('../services/app.use');
const post = require('../controllers/newExam/post');
const cors = require('cors')


module.exports = (app) => {
  app.options('*', cors())
  app.post('/newExam', cors(), post.handler);
  appUse.appUse(app);
};