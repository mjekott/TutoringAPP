//check to see if there is a token adn a header

const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = (req, res, next) => {
  //Get Token from header
  const token = req.header("x-auth-token");

  //check if token doesn't exist
  if (!token) {
    return res
      .status(401)
      .json({ statusCode: 401, message: "No token,authorization denied!" });
  }

  //else .. token exist
  try {
    const decoded = jwt.verify(token, SECRET);

    //ASSIGN user to request object

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid", statusCode: 401 });
  }
};
