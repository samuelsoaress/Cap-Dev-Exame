const { get } = require('../../../services/request');

const url = "http://bralpsvvwas02:8083/"

const getAllQuestion = async (req, res) => {

    const request = req.app.get('hystrix').hystrixRequestHandler(get, 'All Questions');
    return request.execute(
        url + 'questao/',
        req,
        res,
    )
}

const handler = async (req, res, next) => {
    try {
        console.log("getAllQuestion")
        let question = await getAllQuestion(req, res)
        return res.status(200).json(question.data)
    } catch (error) {
        return next(error, req, res);
    }
};
module.exports = {
    handler: handler
}