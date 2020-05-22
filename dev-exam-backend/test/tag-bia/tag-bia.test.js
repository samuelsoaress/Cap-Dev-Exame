const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const { app } = require('../../app/config/express');
const mockTagBia = require('../tag-bia/tag-bia.mock');

const {
  req,
  res,
  next,
} = mockTagBia;

let router;

describe('# Teste da funcionalidade router', function () { 
  this.timeout(10000);

  before(() => {
    req.app = app;
  });


  describe('router (controller/tag-bia)', () => {
    before(() => {
      router = proxyquire('../../app/controllers/tag-bia/post', {
        '../../../services/request': {
          get: mockTagBia.get,
        },
      });
    });
    it('Handler não retorna null', done => {
      const response = router.handler(req, res, next);
      expect(response.statusCode).to.be.not.null;
      done();
    });

  });
});
