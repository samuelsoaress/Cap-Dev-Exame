const cors = require('cors');
const appUse = require('../services/app.use');
const get = require('../controllers/technologies/get');
const post = require('../controllers/technologies/post');
const put = require('../controllers/technologies/put');
const del = require('../controllers/technologies/delete');


module.exports = (app) => {
  app.options('*', cors());
  app.get('/technologies', cors(), get.handler);
  app.post('/technologies', cors(), post.handler);
  app.put('/technologies', cors(), put.handler);
  app.delete('/technologies/:codigo', cors(), del.handler);
  appUse.appUse(app);
};