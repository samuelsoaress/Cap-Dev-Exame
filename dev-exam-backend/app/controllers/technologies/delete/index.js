const { excluir } = require('../../../services/request2');

const url = "http://bralpsvvwas02:8083/"


const deleteTechnology = (req, res) => {
    const request = req.app.get('hystrix').hystrixRequestHandler(excluir, 'Excluir tecnologia');

    return request.execute(
        url+"tecnologia/codigo/" + req.params.codigo,
        req,
        res
    )
    // return client.getPromise('http://bralpsvvwas02:8083/tecnologia/', options).then((response) => (response));
}

const handler = async (req, res, next) => {
    try {

        result = await deleteTechnology(req, res)

        return res.status(result.response.statusCode).end();

    } catch (error) {
        return next(error, req, res);
    }
};

module.exports = {
    handler: handler
}