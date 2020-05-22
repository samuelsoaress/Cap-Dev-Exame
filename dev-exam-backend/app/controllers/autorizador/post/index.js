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

const getCandidate = async (request, req, res) => {

    let code = await getCodeExam(request['nomeTeste'],req,res);
    code = code.data[0].codigoProva
    console.log(code)
    let name = request['nomeCandidato']
    let nameGestor = request['emailGestor']
    let emailbody = "<p>Prezado,</p>"
    emailbody += "<p>Você está recebendo este e-mail pois foi indicado para realizar o teste " + request["nomeTeste"] + "  por Rodrigo Conti Costa </p>"
    emailbody += "<p>Abaixo segue o link para realizar a prova</p>"
    emailbody += "<p>http://bralpsvvwas02:8083/capexames/?code=" + code + "</p>"
    emailbody += "<p>Peço gentilmente que preencha com o seu nome completo, Obrigado!</p>"
    emailbody += "<p>Atenciosamente</p>"
    return emailbody
}

const requestAuthorizator = (body,req,res) => {
    console.log(1)
    let data = {}
    data['email'] = body.email
    data['emailGestor'] = body.emailGestor
    
    const request = req.app.get('hystrix').hystrixRequestHandler(post, 'autorizador');
    // return client.postPromise(url+'autorizador/', options).then((response) => (response))
    return request.execute(
        url,
        req,
        res,
        data
    )
}


const handler = async (req, res, next) => {
    try {
        let request = req.body

        let response = await requestAuthorizator(request,req,res)

        let emailbody = await getCandidate(request, req,res)

        email.sendCandidate(emailbody, request['email'], request)

        return res.status(200).json({"succes":"email enviado"});;

    } catch (error) {
        return next(error, req, res);
    }
};

module.exports ={
    handler:handler
}