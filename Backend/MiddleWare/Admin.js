const connection = require("../DataBase/connection");
const userQueries = require("../DataBase/queries.user")
const util = require("util"); // helper

const admin = async (req, res, next) => {
  const { token } = req.headers;
  const adminData = await userQueries.getUsersByToken(token);
  if (adminData[0] && adminData[0].role_id == 1) {
    next();
  } else {
    res.status(403).json({
      msg: "you are not authorized to access this route !",
    });
  }
};

module.exports = admin;