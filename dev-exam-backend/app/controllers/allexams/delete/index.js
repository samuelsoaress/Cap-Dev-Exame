const { excluir } = require('../../../services/request2');

const url = "http://bralpsvvwas02:8083/"

const deleteExam = async (req, res) => {

    const request = req.app.get('hystrix').hystrixRequestHandler(excluir, 'Del Exam');
    console.log("Codigo da Exame: " + req.params.code)
    return request.execute(
        url + 'composicao-prova/codigo/' + req.params.code,
        req,
        res,
        "teste",
    )
}

const handler = async (req, res, next) => {
    try {
        let question = await deleteExam(req, res)
        return res.status(200).json(question.data)
    } catch (error) {
        return next(error, req, res);
    }
};
module.exports = {
    handler: handler
}