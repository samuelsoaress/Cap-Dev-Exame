const appUse = require('../services/app.use');
const post = require('../controllers/authenticate/post');
const cors = require('cors')


module.exports = (app) => {
  app.post('/authenticate', post.auth);
  appUse.appUse(app);
};