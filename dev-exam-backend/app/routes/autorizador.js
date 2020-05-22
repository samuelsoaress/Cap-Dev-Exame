const appUse = require('../services/app.use');
const post = require('../controllers/autorizador/post');
const cors = require('cors')


module.exports = (app) => {
  app.options('*', cors())
  app.post('/autorizador', cors(), post.handler);
  appUse.appUse(app);
};