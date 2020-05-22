const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const { app } = require('../../app/config/express');
const mockConfirmacoes = require('../confirmacoes/confirmacoes.mock');
const index = require('../../app/controllers/confirmacoes/post/index'); 

const {
  req,
  res,
  next,
} = mockConfirmacoes;

let confirmacoes;

describe('# Teste da funcionalidade Confirmacoes', function () { // eslint-disable-line func-names
  this.timeout(10000);

  before(() => {
    req.app = app;
  });


  describe('Confirmacoes (controller/confirmacoes)', () => {
    before(() => {
      confirmacoes = proxyquire('../../app/controllers/confirmacoes/post', {
        '../../../services/request': {
          get: mockConfirmacoes.get,
        },
      });
    });
    it('Handler não retorna null', done => {
      const response = confirmacoes.handler(req, res, next);
      expect(response.statusCode).to.be.not.null;
      done();
    });

    it('Teste funcionalidade de confirmacoes', async () =>{
      const request = Object.assign({}, req);
      request.headers = mockConfirmacoes.headers;
      request.query = mockConfirmacoes.query;
      request.body  = mockConfirmacoes.body;

      const response = await confirmacoes.handler(request, res, next);
      expect(response).to.be.not.null;
    });

    it('Teste funcionalidade de confirmacoes OUR', async () =>{
      const request = Object.assign({}, req);
      request.headers = mockConfirmacoes.headers;
      request.query = mockConfirmacoes.query;
      mockConfirmacoes.body.grupoValor.respDespesas = "OUR";
      request.body  = mockConfirmacoes.body;

      const response = await confirmacoes.handler(request, res, next);
      expect(response).to.be.not.null;
    });

    it('Teste funcionalidade de confirmacoes verifica erros', async () =>{
      const response = index.verificarErros(res, {
          "error": "teste",
        
      });
      expect(response).to.be.not.null;
    });
  });
});
