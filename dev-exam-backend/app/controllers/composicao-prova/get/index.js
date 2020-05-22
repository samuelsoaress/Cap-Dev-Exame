const { get } = require('../../../services/request');

const url = "http://bralpsvvwas02:8083/"


const composicaoProva = (req,res) => {
    const request = req.app.get('hystrix').hystrixRequestHandler(get, 'composicao prova');
    // return client.getPromise('http://bralpsvvwas02:8083/composicao-prova/', options).then((response) => (response))
    return request.execute(
        url+"/composicao-prova/",
        req,
        res,

    )

}



const handler = async (req, res, next) => {
    try {

        result = await composicaoProva(req, res)

        return res.status(result.response.statusCode).json(result.data);

    } catch (error) {
        return next(error, req, res);
    }
};

module.exports = {
    handler: handler
}