const jwt = require("jsonwebtoken");

const UserAuthorizationMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    res
      .status(498)
      .json({ success: false, message: "Not authorized to access" });
  }
  const user = jwt.verify(authHeader, "JSON_SECRET_KEY");
  if (!user) {
    res.status(498).json({ success: false, message: "Invalid token" });
  }
  req.user = user;
  next();
};

module.exports = UserAuthorizationMiddleware;
