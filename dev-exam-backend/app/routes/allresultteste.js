const appUse = require('../services/app.use');
const get = require('../controllers/allresultteste/get');
const cors = require('cors')


module.exports = (app) => {
    app.get('/allresultteste', cors(), get.handler);
    appUse.appUse(app);
};