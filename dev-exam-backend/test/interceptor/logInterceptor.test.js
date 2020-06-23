const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const { app } = require('../../app/config/express');
const tracing = require('@bradesco/coredig-microsvc-headers');
const mockInterceptor = require('../mock');
const logInterceptor = require('../../app/config/loggerInterceptor');
const errors = require('../../app/services/error');


const {
    req,
    res,
    next,
  } = mockInterceptor;

describe('# Teste de configuracoes', function () { // eslint-disable-line func-names
    this.timeout(10000);

    before(() => {
        req.app = app;
    });

    it('Teste request handler', () => {
        let retorno = logInterceptor.requestHandler(req, res, () => {}
        );
        expect(retorno).to.be.not.null;
    });

    it('Teste request handler else', () => {
        req.originalUrl = '/health';
        let retorno = logInterceptor.requestHandler(req, res, () => {}
        );
        expect(retorno).to.be.not.null;
    });

    it('Teste request handler', () => {
        let retorno = logInterceptor.responseHandler(req, res, () => {}
        );
        expect(retorno).to.be.not.null;
    });

    it('Teste Error', () => {
        let retorno = errors.getError({message: 'Teste Erro'});
        expect(retorno).to.be.not.null;
    });

    it('Teste jsonResponse function ', async () => {

        const resAux = {
            getHeaders: () => {
                return {
                    'x-stateless-open': 'a00=',
                    'x-stateless-closed': 'a00=',
                }
            },
            statusCode: 200
        };
        const response = logInterceptor.jsonResponse(req, resAux, null);
        expect(response).to.be.instanceOf(Object);
    });


});