const cors = require('cors');
const appUse = require('../services/app.use');
const get = require('../controllers/usuario/get');
const post = require('../controllers/usuario/post');
const put = require('../controllers/usuario/put');
const del = require('../controllers/usuario/delete');


module.exports = (app) => {
  app.options('*', cors());
  app.get('/usuario', cors(), get.handler);
  app.post('/usuario', cors(), post.handler);
  app.put('/usuario', cors(), put.handler);
  app.delete('/usuario/:codigo', cors(), del.handler);
  appUse.appUse(app);
};