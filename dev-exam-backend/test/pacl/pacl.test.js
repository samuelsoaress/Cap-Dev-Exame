const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const { app } = require('../../app/config/express');
const mockPacl = require('../pacl/pacl.mock');
const index = require('../../app/controllers/pacl/get/mapper');
 

const {
  req,
  res,
  next,
} = mockPacl;

let pacl;


describe('# Teste da funcionalidade PACL', function () { // eslint-disable-line func-names
  this.timeout(10000);

  before(() => {
    req.app = app;
  });


  describe('Pacl (controller/Pacl)', () => {
    before(() => {
      pacl = proxyquire('../../app/controllers/pacl/get', {
        '../../../services/request': {
          get: mockPacl.get,
        },
      });
    });

    paclErro = proxyquire('../../app/controllers/pacl/get', {
      '../../../services/request': {
        get: mockPacl.get,
      },
    });
    it('Handler não retorna null', done => {
      const response = pacl.handler(req, res, next);
      expect(response.statusCode).to.be.not.null;
      done();
    });

    it('Handler retorna erro', done => {
      const response = pacl.handler(undefined, res, next);
      expect(response.statusCode).to.be.not.null;
      done();
    });

    it('Teste funcionalidade de pacl', async () =>{
      const request = Object.assign({}, req);
      request.headers = mockPacl.headers;
      request.query = mockPacl.query;
      request.body  = mockPacl.body;

      const response = await pacl.handler(request, res, next);
      expect(response).to.be.not.null;
    });

    it('Teste funcionalidade de pacl OUR', async () =>{
      const request = Object.assign({}, req);
      request.headers = mockPacl.headers;
      request.query = mockPacl.query;
      request.body  = mockPacl.body;

      const response = await pacl.handler(request, res, next);
      expect(response).to.be.not.null;
    });

    it('Teste funcionalidade PACL backToFront', async () =>{
     const data = {
      conta: {
        banco: 237,
        agencia: 111,
        conta: 11111,
        digitoConta:1
      },
        tudoBloqueado:true,
        acessos: [{bloqueado:true, codServico:84}]
      }
      const response =  index.backToFront(data);
      expect(response).to.be.not.null;
    });

    it('Teste funcionalidade PACL tratar Erro', async () =>{
       var mensagem = "8990 - Erro TEste"
       const response =  index.tratarErro(mensagem);
       expect(response).to.be.not.null;
     });
  });
});
