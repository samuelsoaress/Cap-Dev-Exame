const cors = require('cors');
const appUse = require('../services/app.use');
const get = require('../controllers/technologies/get');
const post = require('../controllers/technologies/post');


module.exports = (app) => {
  app.options('*', cors());
  app.get('/technologies', cors(), get.handler);
  app.post('/technologies', cors(), post.handler);
  appUse.appUse(app);
};