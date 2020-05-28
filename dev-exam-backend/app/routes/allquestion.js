const appUse = require('../services/app.use');
const get = require('../controllers/allscreenquestions/get');
const cors = require('cors')


module.exports = (app) => {
    app.get('/allquestion', cors(), get.handler);
    appUse.appUse(app);
};