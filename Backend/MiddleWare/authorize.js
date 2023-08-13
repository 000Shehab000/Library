const connection = require("../DataBase/connection");
const userQueries = require("../DataBase/queries.user");
const util = require("util"); // helper

const authorized = async (req, res, next) => {
  const { token } = req.headers;
  const userDataInDataBase = await userQueries.getUsersByToken(token)
  if (userDataInDataBase[0]) {
    next();
  } else {
    res.status(403).json({
      message: "you are not authorized to access this route !",
    });
  }
};

module.exports = authorized;