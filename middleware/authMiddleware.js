const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token expired" });
  }
};

module.exports = validateJWT;
