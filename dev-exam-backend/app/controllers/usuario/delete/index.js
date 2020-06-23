const { excluir } = require('../../../services/requestUsers');

const url = "http://bralpsvvwas02:8083/"

const DeleteUser = async (req, res) => {

    const request = req.app.get('hystrix').hystrixRequestHandler(excluir, 'Del usuario');
    console.log("Codigo do usuário: " + req.params.code)
    return request.execute(
        url + 'usuario/codigo/' + req.params.code,
        req,
        res,
    )
}

const handler = async (req, res, next) => {
    try {
        let user = await DeleteUser(req, res)
        return res.status(200).json(user.data)
    } catch (error) {
        return next(error, req, res);
    }
};
module.exports = {
    handler: handler
}