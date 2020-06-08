const { Client } = require('node-rest-client-promise');

const client = new Client();

const headers = {
    'Content-Type': 'application/json',

};

const get = (url, req, res) => {
    const options = {
        headers: headers
    };
    console.log("GET")

    return client.getPromise(url, options).then((response) => (response));
};

const excluir = (url, req, res, teste) => {
    const options = {
        headers: headers
    };
    console.log("DELETE")
    return client.deletePromise(url, options).then((response) => (response));
};
const post = (url, req, res, body = {}) => {

    const options = {
        data: body,
        headers: headers
    };
    console.log("post")

    return client.postPromise(url, options).then((response) => (response));
};

const put = (url, req, res, body = {}) => {

    const options = {
        data: body,
        headers: headers
    };
    console.log("put")
    return client.put(url, options).then((response) => (response));
}

module.exports = {
    get: get,
    excluir: excluir,
    post: post,
    put: put
};
