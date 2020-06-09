const { post } = require('../../../services/requestUsers');

const url = "http://bralpsvvwas02:8083/"


const postUsuario = (body, req, res) => {
    const request = req.app.get('hystrix').hystrixRequestHandler(post, 'Cadastrar Tecnologia');

    return request.execute(
        url + 'usuario/',
        req,
        res,
        body
    )
    // return client.getPromise('http://bralpsvvwas02:8083/tecnologia/', options).then((response) => (response));
}

const handler = async (req, res, next) => {
    try {

        result = await postUsuario(req.body, req, res);

        return res.status(result.response.statusCode).json({ codigo: req.body.codigo, tecnologia: req.body.tecnologia });

    } catch (error) {
        return next(error, req, res);
    }
};

module.exports = {
    handler: handler
}