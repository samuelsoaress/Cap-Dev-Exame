const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const { app } = require('../../app/config/express');
const mockRemessa = require('../remessa/remessa.mock');
const index = require('../../app/services/defineResponse');

const {
  req,
  res,
  next,
} = mockRemessa;

let remessa;

describe('# Teste da funcionalidade Remessa', function () { // eslint-disable-line func-names
  this.timeout(10000);

  before(() => {
    req.app = app;
  });


  describe('Remessa (controller/remessa)', () => {
    before(() => {
      remessa = proxyquire('../../app/controllers/remessa/get', {
        '../../../services/request': {
          get: mockRemessa.get,
        },
      });
    });
    it('Handler não retorna null', done => {
      const response = remessa.handler(req, res, next);
      expect(response.statusCode).to.be.not.null;
      done();
    });

    it('Teste funcionalidade de remessa', async () =>{
      const request = Object.assign({}, req);
      request.headers = mockRemessa.headers;
      request.query = mockRemessa.query;
      request.body = mockRemessa.body;

      const response =  remessa.handler(request, res, next);
      expect(response).to.be.not.null;
    });

    it('Teste funcionalidade de remessa status 200', async () =>{
      const response = index.defineResponseGet(res, {
          response: {statusCode: 200},
          data: {
            teste:"teste"
          }
        
      });
      expect(response).to.be.not.null;
    });
    it('Teste funcionalidade de remessa status 500', async () =>{
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
