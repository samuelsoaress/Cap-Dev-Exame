const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const { app } = require('../../app/config/express');
const mockRequisicao = require('../mock');
const mockRequest = require('../mock');
const tracing = require('@bradesco/coredig-microsvc-headers');
const requisicao = require('../../app/services/request');

const {
    req,
    res,
    next,
  } = mockRequisicao;

  describe('# Teste da funcionalidade Requisicao', function () { // eslint-disable-line func-names
    this.timeout(10000);

    before(() => {
        req.app = app;
    });

    it('Testando definicao de header com string', () => {
        let retorno = requisicao.defineHeaders(mockRequisicao.res, null);
        expect(retorno).to.be.not.null;
    });

    it('Testando definicao de header com objeto', () => {
        let retorno = requisicao.defineHeaders(mockRequisicao.res, {cwssession: 'Teste definicao header - objeto'});
        expect(retorno).to.be.not.null;
    });

    it('Testando definicao de header', () => {
       
        const xsd = mockRequest.res.locals.stateless;
        const headers = {
            'Content-Type': 'application/json',
            'x-login-canal': 66,
            'x-login-empresa': 237,
            'x-login-idioma': 1,
            'x-login-periferico': 'LOCAL',
            'x-login-dependencia': 1,
            'cwssession': "cwssession"
          };
        let retorno = requisicao.fillCwsData(xsd,  headers)
        expect(retorno).to.be.not.null;
    });

  });