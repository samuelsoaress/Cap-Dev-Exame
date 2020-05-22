const appUse = require('../services/app.use');
const get = require('../controllers/exam/get');
const cors = require('cors')


module.exports = (app) => {
  app.options('*', cors())
  app.get('/exam', cors(), get.handler);
  appUse.appUse(app);
};