const { get } = require('../../../services/request');

const url = "http://bralpsvvwas02:8083/";

const dataCandidate = (req,res) =>{
    const getUser = url+"autorizador/"+req.query.autorizador+"/email/"+req.query.user
    const request = req.app.get('hystrix').hystrixRequestHandler(get, 'gestor responsavel');
    
    
    // return client.getPromise(url+'composicao-prova/nomeTeste/' + nome, options).then((response) => (response));
    return request.execute(
        getUser,
        req,
        res
    )
}




const handler = async (req, res, next) => {
    try {
        if (!req.query.user || !req.query.autorizador) {
            return res.send({
                error: 'Voce precisa fornecer um email e codigo de acesso.'
            })
        }
        let response = await dataCandidate(req,res)
        console.log(response.data)

        //res.status(200).json({"succes":"succes"})
        return res.status(response.response.statusCode).json(response.data);

    } catch (error) {
        return next(error, req, res);
    }
}

module.exports = {
    handler: handler
}