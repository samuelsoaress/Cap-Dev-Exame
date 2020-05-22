const appUse = require('../services/app.use');
const get = require('../controllers/composicao-prova/get');
const cors = require('cors')


module.exports = (app) => {
  app.options('*', cors())
  app.get('/composicao-prova', cors(), get.handler);
  appUse.appUse(app);
};