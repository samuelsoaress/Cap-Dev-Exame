const appUse = require('../services/app.use');
const get = require('../controllers/tecnologia/get');
const cors = require('cors')


module.exports = (app) => {
  app.options('*', cors())
  app.get('/tecnologia', cors(), get.handler);
  appUse.appUse(app);
};