const appUse = require('../services/app.use');
const get = require('../controllers/signout/get');
const cors = require('cors')


module.exports = (app) => {
  app.get('/signout', get.handler);
  appUse.appUse(app);
};