const appUse = require('../services/app.use');
const post = require('../controllers/allquestions/post');
const cors = require('cors')


module.exports = (app) => {
  app.post('/newquestion', post.handler);
  appUse.appUse(app);
};