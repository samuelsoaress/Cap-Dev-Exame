const { get } = require('../../../services/request');

const url = "http://bralpsvvwas02:8083/";

const dataCandidate = (req,res) =>{
    const allResponsible = url+"autorizador/"
    const request = req.app.get('hystrix').hystrixRequestHandler(get, 'gestor responsavel');
    
    
    // return client.getPromise(url+'composicao-prova/nomeTeste/' + nome, options).then((response) => (response));
    return request.execute(
        allResponsible,
        req,
        res
    )
}




const handler = async (req, res, next) => {
    try {
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