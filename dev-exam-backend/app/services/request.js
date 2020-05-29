const { Client } = require('node-rest-client-promise');

const client = new Client();

const headers = {
  'Content-Type': 'application/json',

};

const get = (url, req, res) => {
  const options = {
    headers: headers
  };
  console.log("Teste de GET")
  //req.app.get('logger').info(url);
  //req.app.get('logger').info(options);
  return client.getPromise(url, options).then((response) => (response));
};

const excluir = (url, req, res, teste) => {
  const options = {
    headers: headers
  };
  console.log("URL: " + url)
  console.log("Options: " + options)
  //req.app.get('logger').info(url);
  //req.app.get('logger').info(options);
  return client.deletePromise(url, options).then((response) => (response));
};

const post = (url, req, res, body = {}) => {
  //req.app.get('logger').info(url);
  const options = {
    data: body,
    headers: headers
  };
  console.log(url)
  console.log(options)
  //req.app.get('logger').info('Entrada - Requisição Hystrix');
  // req.app.get('logger').info({
  //   url,
  //   options,
  // });
  return client.postPromise(url, options).then((response) => (response));
};

module.exports = {
  get: get,
  post: post,
  excluir: excluir
};
