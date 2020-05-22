const expect = require('chai').expect;
// const chaiAsPromised = require('chai-as-promised');
const proxyquire = require('proxyquire');
const { app } = require('../../app/config/express');
const mockRequisicao = require('../mock');
const tracing = require('@bradesco/coredig-microsvc-headers');
const validador = require('../../app/services/validation');

const {
    req,
    res,
    next,
  } = mockRequisicao;

describe('# Teste da funcionalidade Validation', function () { // eslint-disable-line func-names
    this.timeout(10000);

    before(() => {
        req.app = app;
    });

    it('Validando params', () => {
        const retorno = validador.validateParams('', '');
        expect(retorno).to.be.not.null;
    });

    it('Validando body', () => {
        const retorno = validador.validateBody('', '');
        expect(retorno).to.be.not.null;
    });

    it('Validando params', () => {
        const retorno = validador.validateParams('', {});
        expect(retorno).to.be.instanceOf(Error);
    });

    it('Validando body', () => {
        const retorno = validador.validateBody('', {});
        expect(retorno).to.be.not.null;
    });

    it('Validando Header', () => {
        const retorno = validador.validateHeaders('', {});
        expect(retorno).to.be.instanceOf(Error);
    });


});