const { excluir } = require('../../../services/request2');

const url = "http://bralpsvvwas02:8083/"

const deleteQuestion = async (req, res) => {

    const request = req.app.get('hystrix').hystrixRequestHandler(excluir, 'Del question');
    console.log("Codigo da questão: " + req.params.code)
    return request.execute(
        url + 'questao/codigo/' + req.params.code,
        req,
        res,
        "teste",
    )
}

const handler = async (req, res, next) => {
    try {
        let question = await deleteQuestion(req, res)
        return res.status(200).json(question.data)
    } catch (error) {
        return next(error, req, res);
    }
};
module.exports = {
    handler: handler
}