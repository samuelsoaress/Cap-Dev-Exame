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
    tipoDocumento: "F",
    segmento: 100
  },
  body: {
    "cliente":{"conta":{"tipo":"1","banco":237,"agencia":"3963","conta":"405","digConta":"7"},
    "documento":{"tipo":"CPF","controle":"56","filial":"","numero":"063113568"},
    "titularidade":"1","ctl":"","nome":"JOSE DA SILVA","segmento":"100"},
    "grupoValor":{"moeda":{"id":220,"nome":"N","sigla":"N"},
    "motivo":{"id":"1","nome":"N"},"valor":2000,"respDespesas":"ENV"},
    "simulacao":{"dataDebito":"2020-03-11","taxaCambial":4.2939297,"tarifaBRL":0,"tarifaUSD":0,"despesaBRL":107.35,"despesaUSD":25,"iof":94.47,"total":8789.68,"valorBRL":8587.86,"vet":4.341165},
    "bancoRecebedor":{"cidade":"MIAMI,FL","nome":"BAC FLORIDA BANK","pais":"ESTADOS UNIDOS"},
    "recebedor":{"pais":{"id":2496,"nome":"ESTADOS UNIDOS","sigla":"N"},
    "cidade":"MIAMI,FL","nome":"JOSE DA SILVA","conta":"1"},
    "codigoSwift":"BFLBUS3M"
},
}, mock);
