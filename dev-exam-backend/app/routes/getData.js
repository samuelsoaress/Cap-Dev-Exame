const appUse = require('../services/app.use');
const get = require('../controllers/getData/get');
const cors = require('cors')

module.exports = (app) => {
  app.get('/getData', get.handler)
  appUse.appUse(app);
}