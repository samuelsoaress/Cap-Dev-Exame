const appUse = require('../services/app.use');
const del = require('../controllers/allscreenquestions/delete');
const cors = require('cors')


module.exports = (app) => {
    app.delete('/delquestion/code/:code', cors(), del.handler);
    appUse.appUse(app);
};