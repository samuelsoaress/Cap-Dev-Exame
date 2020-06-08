const { put } = require('../../../services/put');

const url = "http://bralpsvvwas02:8083/"

// http://bralpsvvwas02:8083/tecnologia/
const updateTechnology = (req,res,body) => {
    const request = req.app.get('hystrix').hystrixRequestHandler(put, 'updatetechnology');
    // return client.getPromise('http://bralpsvvwas02:8083/tecnologia/', options).then((response) => (response))
    return request.execute(
        url+"tecnologia/",
        req,
        res,
        body
    )

}



const handler = async (req, res, next) => {
    try {

        let body = req.body

        result = await updateTechnology(req, res,body)

        return res.status(result.response.statusCode).json(result.data);

    } catch (error) {
        return next(error, req, res);
    }
};

module.exports = {
    handler: handler
}