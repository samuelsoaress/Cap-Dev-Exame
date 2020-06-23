const { Client } = require('node-rest-client-promise');

const client = new Client();

const headers = {
  'Content-Type': 'application/json',

};

const get = (url, req, res) => {
  console.log("Entrou na get com a url: "+url)
  const options = {
    headers: headers
  };
  console.log("GET na"+url)
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
  console.log("Breno "+url)
  console.log("Outro"+options)
  //req.app.get('logger').info('Entrada - Requisição Hystrix');
  // req.app.get('logger').info({
  //   url,
  //   options,
  // });
  return client.postPromise(url, options).then((response) => (response));
};

const put = (url, req, res, body = {}) => {
  //req.app.get('logger').info(url);
  const options = {
    data: body,
    headers: headers
  };
  console.log("Breno "+url)
  console.log("Outro"+options)
  //req.app.get('logger').info('Entrada - Requisição Hystrix');
  // req.app.get('logger').info({
  //   url,
  //   options,
  // });
  return client.put(url, options).then((response) => (response));
}

module.exports = {
  get: get,
  post: post,
  put: put
};
