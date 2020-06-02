const appUse = require('../services/app.use');
const put = require('../controllers/allscreenquestions/put');
const cors = require('cors')


module.exports = (app) => {
  app.options('*', cors())
  app.put('/updatequestion', cors(), put.handler);
  appUse.appUse(app);
};