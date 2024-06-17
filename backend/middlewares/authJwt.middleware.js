const jwt = require("jsonwebtoken");
const config = require("./../config/auth.config");
const { User, Role } = require('./../models');

const verifyToken = (req, res, next) => {
  let accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(403).json({ message: "No token provided!" });
  }

  if (!accessToken.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Invalid token format!" });
  }

  accessToken = accessToken.slice(7);

  jwt.verify(accessToken, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const checkRole = (roles) => (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    Role.findOne({ where: { id: user.roleId } }).then(role => {
      if (roles.includes(role.role)) {
        return next();
      }
      res.status(403).json({ message: `Require ${roles.join(' or ')} Role!` });
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin: checkRole(["administrator"]),
  isSupervisor: checkRole(["supervisor", "administrator"]),
  isSupervisorOrAdmin: checkRole(["supervisor", "administrator"]),
  isOperator: checkRole(["operator"]), // Only operator
  isOperatorOrAdmin: checkRole(["operator", "administrator"])
};

module.exports = authJwt;
