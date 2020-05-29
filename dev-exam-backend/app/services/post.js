const { Client } = require('node-rest-client-promise');

const client = new Client();

const headers = {
    'Content-Type': 'application/json',

};


const post = (url, req, res, body = {}) => {
    //req.app.get('logger').info(url);
    const options = {
        data: body,
        headers: headers
    };
    console.log("Breno " + url)
    console.log("Outro Breno" + options)
    //req.app.get('logger').info('Entrada - Requisição Hystrix');
    // req.app.get('logger').info({
    //   url,
    //   options,
    // });
    return client.postPromise(url, options).then((response) => (response));
};

module.exports = {
    post: post
};
