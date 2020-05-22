const { getError } = require('../services/error');

const appUse = (app) => {
    app.use((err, req, res, next) => {
        // req.app.get('logger').error(err.toString());
        console.log(err.toString());
     
        const error = getError(err);
        res.status(error.status).json(error.message);
     
        next();
      });
}

  module.exports = {
    appUse: appUse,
  };