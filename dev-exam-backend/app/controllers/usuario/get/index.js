const { get } = require('../../../services/requestUsers');

const url = "http://bralpsvvwas02:8083/"

const GetAllUsers = async (req, res) => {

    const request = req.app.get('hystrix').hystrixRequestHandler(get, 'All users');
    return request.execute(
        url + 'usuario/',
        req,
        res,
    )
}

const handler = async (req, res, next) => {
    try {
        console.log("get all users")
        let user = await GetAllUsers(req, res)
        return res.status(200).json(user.data)
    } catch (error) {
        return next(error, req, res);
    }
};
module.exports = {
    handler: handler
}