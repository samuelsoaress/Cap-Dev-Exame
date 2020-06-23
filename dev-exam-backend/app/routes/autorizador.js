const appUse = require('../services/app.use');
const post = require('../controllers/autorizador/post');
const get = require('../controllers/autorizador/get');
const cors = require('cors')


module.exports = (app) => {
  app.options('*', cors())
  app.post('/autorizador', cors(), post.handler);
  app.get('/autorizador', cors(), get.handler);
  appUse.appUse(app);
};