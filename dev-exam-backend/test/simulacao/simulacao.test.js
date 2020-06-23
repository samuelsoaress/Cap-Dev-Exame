const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const { app } = require('../../app/config/express');
const mockSimulacao = require('../simulacao/simulacao.mock');
const index = require('../../app/controllers/simulacao/post/index');

const {
  req,
  res,
  next,
} = mockSimulacao;

let simulacao;

describe('# Teste da funcionalidade Simulação', function () { // eslint-disable-line func-names
  this.timeout(10000);

  before(() => {
    req.app = app;
  });


  describe('Simulacao (controller/simulacao)', () => {
    before(() => {
      simulacao = proxyquire('../../app/controllers/simulacao/post', {
        '../../../services/request': {
          post: mockSimulacao.post,
        },
      });
    });
    it('Handler não retorna null', done => {
      const response = simulacao.handler(req, res, next);
      expect(response.statusCode).to.be.not.null;
      done();
    });

    it('Teste funcionalidade de simulacao', async () =>{
      const request = Object.assign({}, req);
      request.headers = mockSimulacao.headers;
      request.query = mockSimulacao.query;
      request.body = mockSimulacao.body;

      const response = await simulacao.handler(request, res, next);
      expect(response).to.be.not.null;
    });

    it('Teste funcionalidade de simulacao OUR', async () =>{
      const request = Object.assign({}, req);
      request.headers = mockSimulacao.headers;
      request.query = mockSimulacao.query;
      mockSimulacao.body.grupoValor.respDespesas = "OUR"
      request.body = mockSimulacao.body;

      const response = await simulacao.handler(request, res, next);
      expect(response).to.be.not.null;
    });

    it('Teste funcionalidade de solicitacoes status 200', async () =>{
      const response = index.defineResponse(res, {
          response: {statusCode: 200},
          data: {
            dataDebito:"teste",
            taxaCambial: "4.1222222",
            tarifaEmissao: {usd:"100.00", brl:"450.00"},
            valorIOF: "200.00",
            valorDespesa: {usd: "100.00", brl:"450.00"},
            valorDebito: "300.00",
            valorEfetivoTotal: "400.00",
            valorOrdemPagamento: "500.00"
          }
      });
      expect(response).to.be.not.null;
    });

    it('Teste funcionalidade de solicitacoes status 500', async () =>{
      const response = index.defineResponse(res, {
          response: {statusCode: 500},
          data: {
            errors:[{
              message: "sistema indisponivel"
            }]
          }
        
      });
      expect(response).to.be.not.null;
    });

    it('Teste funcionalidade de solicitacoes status 412', async () =>{
      const response = index.defineResponse(res, {
          response: {statusCode: 412},
          data: {
            errors:[{
              message: "sistema indisponivel"
            }]
          }
        
      });
      expect(response).to.be.not.null;
    });
    
  });
});
