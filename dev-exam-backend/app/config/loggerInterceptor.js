const interceptor = require('express-interceptor');

function jsonRequest(req) {
  return {
    request: {
      baseUrl: req.baseUrl,
      body: req.body,
      headers: req.headers,
      method: req.method,
      originalUrl: req.originalUrl,
      params: req.params,
      query: req.query,
      trailers: req.trailers,
      url: req.url,
    },
  };
}

function jsonResponse(req, res, body) {
  const msg = jsonRequest(req);
  msg.response = {
    bodyRetorno: body,
    headers: res.getHeaders(),
    statusCode: res.statusCode,
  };

  return msg;
}

const requestHandler = (req, res, next) => {
  const msg = jsonRequest(req);

  if (req.originalUrl !== '/health') {
    //req.app.get('logger').debug(msg);
    console.log(msg)
  }

  next();
};

const responseHandler = interceptor((req, res) => ({
  isInterceptable() {
    return true;
  },

  intercept(body, send) {
    const msg = jsonResponse(req, res, body);

    if (req.originalUrl !== '/health') {
      //req.app.get('logger').debug(msg);
      console.log(msg)
    }

    send(body);
  },
}));

module.exports = {
  requestHandler,
  responseHandler,
  jsonResponse,
};
