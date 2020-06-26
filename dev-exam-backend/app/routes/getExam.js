const appUse = require('../services/app.use');
const get = require('../controllers/getExam/get');
const cors = require('cors')


module.exports = (app) => {
  app.options('*', cors())
  app.get('/getExam', cors(), get.handler);
  appUse.appUse(app);
};