const { Client } = require('node-rest-client-promise');

const client = new Client();

const headers = {
  'Content-Type': 'application/json',

};


const excluir = (url, req, res, teste) => {
  const options = {
    headers: headers
  };
  console.log("ONERBsahduashduashduashudhasudhasudhasudhausdhausidhuiasdhiaksdhiasudhaisudhasuidh")
  console.log("URL: " + url)
  console.log("Options: " + options)
  //req.app.get('logger').info(url);
  //req.app.get('logger').info(options);
  return client.deletePromise(url, options).then((response) => (response));
};

module.exports = {
  excluir: excluir
};
