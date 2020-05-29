const appUse = require('../services/app.use');
const get = require('../controllers/technology/get');
const cors = require('cors')


module.exports = (app) => {
  app.options('*', cors())
  app.get('/technology', cors(), get.handler);
  appUse.appUse(app);
};