const { Client } = require('node-rest-client-promise');

const client = new Client();

const headers = {
  'Content-Type': 'application/json',

};

const get = (url, req, res) => {
  const options = {
    headers: headers
  };
  console.log(1)
  //req.app.get('logger').info(url);
  //req.app.get('logger').info(options);
  return client.getPromise(url, options).then((response) => (response));
};

const post = (url, req, res, body = {}) => {
  //req.app.get('logger').info(url);
  const options = {
    data: body,
    headers: headers
  };
  //req.app.get('logger').info('Entrada - Requisição Hystrix');
  // req.app.get('logger').info({
  //   url,
  //   options,
  // });
  return client.postPromise(url, options).then((response) => (response));
};

module.exports = {
  get:get,
  post:post
};
