const { Client } = require('node-rest-client-promise');

const client = new Client();

const headers = {
  'Content-Type': 'application/json',

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
    return client.putPromise(url, options).then((response) => (response));
  }

  module.exports = {
    put: put
  };