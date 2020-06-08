const { put } = require('../../../services/requestUsers');

const url = "http://bralpsvvwas02:8083/"


const UpdateUser = (req,res,body) => {
    const request = req.app.get('hystrix').hystrixRequestHandler(put, 'update user');
    return request.execute(
        url+"usuario/",
        req,
        res,
        body
    )

}



const handler = async (req, res, next) => {
    try {

        let body = req.body

        result = await UpdateUser(req, res,body)

        return res.status(result.response.statusCode).json(result.data);

    } catch (error) {
        return next(error, req, res);
    }
};

module.exports = {
    handler: handler
}