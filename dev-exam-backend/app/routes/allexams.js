const appUse = require('../services/app.use');
const get = require('../controllers/allexams/get');
const cors = require('cors')


module.exports = (app) => {
    app.get('/allexams', cors(), get.handler);
    appUse.appUse(app);
};