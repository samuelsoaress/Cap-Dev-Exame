const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const { app } = require('../../app/config/express');
const mockSwifts = require('../swifts/swifts.mock');
const index = require('../../app/services/defineResponse');

const {
  req,
  res,
  next,
} = mockSwifts;

let swifts;

describe('# Teste da funcionalidade Swifts', function () { // eslint-disable-line func-names
  this.timeout(10000);

  before(() => {
    req.app = app;
  });


  describe('Swifts (controller/swifts)', () => {
    before(() => {
      swifts = proxyquire('../../app/controllers/swifts/get', {
        '../../../services/request': {
          get: mockSwifts.get,
        },
      });
    });
    it('Handler não retorna null', done => {
      const response = swifts.handler(req, res, next);
      expect(response.statusCode).to.be.not.null;
      done();
    });

    it('Teste funcionalidade de swifts', async () =>{
      const request = Object.assign({}, req);
      request.headers = mockSwifts.headers;
      request.query = mockSwifts.query;
      request.body = mockSwifts.body;

      const response = await swifts.handler(request, res, next);
      expect(response).to.be.not.null;
    });

  
  });
});
