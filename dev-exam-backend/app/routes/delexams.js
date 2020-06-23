const appUse = require('../services/app.use');
const del = require('../controllers/allexams/delete');
const cors = require('cors')


module.exports = (app) => {
    app.delete('/delexam/code/:code', cors(), del.handler);
    appUse.appUse(app);
};