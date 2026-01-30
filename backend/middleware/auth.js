const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecretkey"; // MUST MATCH server.js

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Token missing");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

module.exports = auth;
