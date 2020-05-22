const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const { app } = require('../../app/config/express');
const mockSolicitacoes = require('../solicitacoes/solicitacoes.mock');

const {
  req,
  res,
  next,
} = mockSolicitacoes;

let solicitacoes;

describe('# Teste da funcionalidade solicitacoes', function () { 
  this.timeout(10000);

  before(() => {
    req.app = app;
  });


  describe('solicitacoes (controller/solicitacoes)', () => {
    before(() => {
      solicitacoes = proxyquire('../../app/controllers/solicitacoes/post', {
        '../../../services/request': {
          get: mockSolicitacoes.get,
        },
      });
    });
    it('Handler não retorna null', done => {
      const response = solicitacoes.handler(req, res, next);
      expect(response.statusCode).to.be.not.null;
      done();
    });

    it('Teste funcionalidade de solicitacoes', async () =>{
      const request = Object.assign({}, req);
      request.headers = mockSolicitacoes.headers;
      request.query = mockSolicitacoes.query;
      request.body = mockSolicitacoes.body;
      const response = await solicitacoes.handler(request, res, next);
      expect(response).to.be.not.null;
    });    

  });
});
