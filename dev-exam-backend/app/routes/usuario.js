const cors = require('cors');
const appUse = require('../services/app.use');
const get = require('../controllers/usuario/get');
const post = require('../controllers/usuario/post');
const put = require('../controllers/usuario/put');
const del = require('../controllers/usuario/delete');


module.exports = (app) => {
  app.options('*', cors());
  app.get('/usuario', cors(), get.handler);
  app.post('/newusuario', cors(), post.handler);
  app.put('/update', cors(), put.handler);
  app.delete('/usuario/codigo/:code', cors(), del.handler);
  appUse.appUse(app);
};