const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const { app } = require('../../app/config/express');
const mockLimites = require('../limites/limites.mock');
const index = require('../../app/services/defineResponse');

const {
  req,
  res,
  next,
} = mockLimites;

let limites;

describe('# Teste da funcionalidade Limites', function () { // eslint-disable-line func-names
  this.timeout(10000);

  before(() => {
    req.app = app;
  });


  describe('Limites (controller/limites)', () => {
    before(() => {
      limites = proxyquire('../../app/controllers/limites/get', {
        '../../../services/request': {
          get: mockLimites.get,
        },
      });
    });
    it('Handler não retorna null', done => {
      const response = limites.handler(req, res, next);
      expect(response.statusCode).to.be.not.null;
      done();
    });

    it('Teste funcionalidade de limites', async () =>{
      const request = Object.assign({}, req);
      request.headers = mockLimites.headers;
      request.query = mockLimites.query;
      request.body = mockLimites.body;

      const response = await limites.handler(request, res, next);
      expect(response).to.be.not.null;
    });

    it('Teste funcionalidade de limites status 200', async () =>{
      const response = index.defineResponseGet(res, {
          response: {statusCode: 200},
          data: {
            teste:"teste"
          }
        
      });
      expect(response).to.be.not.null;
    });
    
    it('Teste funcionalidade de limites status 500', async () =>{
      const response = index.defineResponseGet(res, {
          response: {statusCode: 500},
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
