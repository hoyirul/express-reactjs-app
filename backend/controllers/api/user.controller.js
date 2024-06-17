const { User } = require("./../../models");
const apiResponse = require("./../../traits/api-response");

module.exports = {
  // for get all data from user table
  index: async (req, res) => {
    try{
      const response = await User.findAll({
        attributes: [
          "id",
          "name",
          "email",
          "password",
          "createdAt",
          "updatedAt",
        ],
      });
  
      return apiResponse.success(res, response, 200);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // create new data to user table
  store: async (req, res) => {
    try {
      const response = await User.create(req.body);
      return apiResponse.success(res, response, 201);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // get data by id from user table
  show: async (req, res) => {
    try {
      const response = await User.findByPk(req.params.id, {
        attributes: [
          "id",
          "name",
          "email",
          "password",
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
  },

  // update data by id from user table
  update: async (req, res) => {
    try {
      const response = await User.update(req.body, {
        where: { id: req.params.id },
      });

      if (response == 1) {
        return apiResponse.success(res, { message: "Data updated" }, 200);
      }

      return apiResponse.errors(res, { message: "Data not found" }, 404);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },

  // delete data by id from user table
  destroy: async (req, res) => {
    try {
      const response = await User.destroy({
        where: { id: req.params.id },
      });

      if (response == 1) {
        return apiResponse.success(res, { message: "Data deleted" }, 200);
      }

      return apiResponse.errors(res, { message: "Data not found" }, 404);
    } catch (err) {
      return apiResponse.errors(res, { message: err.message }, 500);
    }
  },
};