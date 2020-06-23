const email = require('../../../utils/email')
const { post } = require('../../../services/request');
const { get } = require('../../../services/request');


const url = "http://bralpsvvwas02:8083/";

const getCodeExam = (nome,req,res) => {
    const urlForName = url+"composicao-prova/nomeTeste/"+nome
    const request = req.app.get('hystrix').hystrixRequestHandler(get, 'composicao prova');
    
    
    // return client.getPromise(url+'composicao-prova/nomeTeste/' + nome, options).then((response) => (response));
    return request.execute(
        urlForName,
        req,
        res
    )
}

const getCodeByName = (nomeTeste,req,res) => {
    const urlForName = url+"composicao-prova/nomeTeste/"+nomeTeste
    const request = req.app.get('hystrix').hystrixRequestHandler(get, 'composicao prova');
    
    
    // return client.getPromise(url+'composicao-prova/nomeTeste/' + nome, options).then((response) => (response));
    return request.execute(
        urlForName,
        req,
        res
    )
}

const getCandidate = async (codeAcess,request, req, res) => {

    let code = await getCodeExam(request['nomeTeste'],req,res);
    code = code.data[0].codigoProva
    console.log(code)
    let name = request['nome']
    let nameGestor = request['emailGestor']
    let emailbody = "<p>Prezado, "+name+"</p>"
    emailbody += "<p>Você está recebendo este e-mail pois foi indicado para realizar o teste " + request["nomeTeste"] + "  por Rodrigo Conti Costa </p>"
    emailbody += "<p>Abaixo segue o link para realizar a prova</p>"
    emailbody += "<p>http://bralpsvvwas02:8083/capexames/?code=" + code + "</p>"
    emailbody += "<p>esse " + codeAcess + " é o seu codigo de acesso use para acessar a prova junto com seu email!</p>"
    emailbody += "<p>Peço gentilmente que preencha com o seu nome completo, Obrigado!</p>"
    emailbody += "<p>Atenciosamente</p>"
    return emailbody
}

const requestAuthorizator = async (body,req,res) => {
    let data = {}
    let codeExam = await getCodeByName(body['nomeTeste'],req,res)
    const autorizador = url+"autorizador/"
    data['email'] = body.email
    data['emailGestor'] = body.emailGestor
    data['nome'] = body.nome
    data['codigoProva'] = codeExam.data[0].codigo
    data['tempoRestante'] = body.tempoRestante
    const request = req.app.get('hystrix').hystrixRequestHandler(post, 'autorizador');
    // return client.postPromise(url+'autorizador/', options).then((response) => (response))
    return request.execute(
        autorizador,
        req,
        res,
        data
    )
}


const handler = async (req, res, next) => {
    try {
        let request = req.body

        let response = await requestAuthorizator(request,req,res)

        let emailbody = await getCandidate(response.data.autorizador,request, req,res)

        email.sendCandidate(emailbody, request['email'], request)

        return res.status(200).json({"succes":"email enviado"});;

    } catch (error) {
        return next(error, req, res);
    }
};

module.exports ={
    handler:handler
}