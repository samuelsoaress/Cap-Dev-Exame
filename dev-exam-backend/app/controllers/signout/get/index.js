
const handler = async (req, res, next) => {
  try {

      await req.logOut()
      return res.sendStatus(200).json({"success":"logout sucesfully"})

  } catch (error) {
      return next(error, req, res);
  }
};

module.exports = {
  handler: handler
}