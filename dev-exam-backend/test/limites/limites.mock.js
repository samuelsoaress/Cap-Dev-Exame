const mock = require('../mock');

module.exports = Object.assign({
  get: (...args) => ( // eslint-disable-line no-unused-vars
    new Promise(resolve => (resolve(
      {
        response: { statusCode: 200 },
        data: { teste: 'teste' },
      }
    )))
  ),
  post: (...args) => ( // eslint-disable-line no-unused-vars
    new Promise(resolve => (resolve(
      {
        response: { statusCode: 200 },
        data: { teste: 'teste' },
      }
    )))
  ),
  headers: {
    'x-stateless-open': 'a00=',
    'x-stateless-closed': 'a00=',
  },
  params: {
  },
  query: {
    canal: 661,
    moeda: 220,
    tipoOperacao: 'ENVIO',
  },
  body: {
  },
}, mock);
