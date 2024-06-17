const Validator = require('fastest-validator');
const { Role, User } = require('../../models');
const v = new Validator();
const apiResponse = require('../../traits/api-response');

const config = require("./../../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            return res.json({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          return res.json({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      return res.status(500).json({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (!user) {
      return res.status(404).json({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    var authorities = [];
    Role.findOne({
      where: {
        id: user.roleId
      }
    }).then(roles => {
      authorities.push("ROLE_" + roles.role.toUpperCase());
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        headersToken: 'Bearer',
        accessToken: token
      });
    });
  }).catch(err => {
    return res.status(500).json({ message: err.message });
  });
};

// profile for get data by id from user table
exports.profile = async (req, res) => {
  try {
    const response = await User.findByPk(req.userId, {
      attributes: [
        "id",
        "name",
        "email",
        "password",
        "roleId",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!response) {
      return apiResponse.errors(res, { message: "Data not found" }, 404);
    }

    return apiResponse.success(res, response, 200);
  } catch (err) {
    return apiResponse.errors(res, { message: err.message }, 500);
  }
};

// sign out
exports.signout = (req, res) => {
  return res.status(200).json({ 
    accessToken: null, 
    message: "Sign Out Success!" 
  });
}