const { Client } = require('node-rest-client-promise');

const client = new Client();

const headers = {
    'Content-Type': 'application/json',

};

const get = (url, req, res) => {
    const options = {
        headers: headers
    };
    console.log("Get Resultado dos testes")
    //req.app.get('logger').info(url);
    //req.app.get('logger').info(options);
    return client.getPromise(url, options).then((response) => (response));
};

module.exports = {
    get: get,
};
