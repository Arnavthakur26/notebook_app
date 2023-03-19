const jwt = require("jsonwebtoken");
const JWT_SECRET = "notebookapp";

const fetchUser = (req, res, next) => {
  //Get user from JWT and append id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Invalid Token" });
  }
  const data = jwt.verify(token, JWT_SECRET);
  req.user = data.user;
  next();
};

module.exports = fetchUser;
