const appUse = require('../services/app.use');
const get = require('../controllers/responsavelCap/get');
const cors = require('cors')


module.exports = (app) => {
  app.options('*', cors())
  app.get('/responsavelCap', cors(), get.handler);
  appUse.appUse(app);
};