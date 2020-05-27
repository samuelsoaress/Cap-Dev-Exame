const { post } = require('../../../services/request');

const url = "http://bralpsvvwas02:8083/"

const getAllQuestion = async (body,req,res) => {

    const request = req.app.get('hystrix').hystrixRequestHandler(post, 'new Exame');
    return request.execute(
        url + 'questao/',
        req,
        res,
        body,

    )

}


const handler = async (req, res, next) => {
    try {

        let requestData = req.body

        await getAllQuestion(requestData, req, res)

        return res.status(200).json({ "statusCode": 200, "message": "email sent" })

    } catch (error) {
        return next(error, req, res);
    }
};

module.exports = {
    handler: handler
}