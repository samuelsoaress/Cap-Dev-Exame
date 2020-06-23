const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const { app } = require('../../app/config/express');
const mockSimulacao = require('../simulacao/simulacao.mock');
const mockRequest = require('../mock');
const login = require('../../app/controllers/login/post/login');

const {
    req,
    res,
    next,
  } = mockSimulacao;

  let limites;

describe('# Teste do Login.js ', function () { // eslint-disable-line func-names
    this.timeout(10000);

    before(() => {
      limites = proxyquire('../../app/controllers/login/post/login', {
        '../../../services/request': {
          post: mockSimulacao.post,
        },
      });
    });
    
      it('testando o login.js 1', async () => {     
        //const xsd = mockRequest.res.locals.stateless;
        const response = await limites.execute(req, res, req.next);
        expect(response).to.be.not.null;       
      });

    
});


