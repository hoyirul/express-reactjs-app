const Validator = require("fastest-validator");
const { Role } = require("./../../models");
const db = require("./../../models");
const apiResponse = require("./../../traits/api-response");
const v = new Validator();

module.exports = {
  // for get all data from role table
  index: async (req, res) => {
    try{
      const response = await Role.findAll();

      return apiResponse.success(res, response, 200);
    } catch (err) {
      return apiResponse.success(res, { message: err.message }, 500);
    }
  },

  // for insert data to role table
  store: async (req, res) => {
    try{
      const schema = {
        role: "string",
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.status(400).json(validate);
      }

      await Role.create(req.body);

      return apiResponse.success(res, { message: "Data successfuly inserted!" }, 201);
    } catch (err) {
      return apiResponse.success(res, { message: err.message }, 500);
    }
  },

  // for get data by id from role table
  show: async (req, res) => {
    try{
      const id = req.params.id;
      const response = await Role.findByPk(id, {
        attributes: ["id", "role", "createdAt", "updatedAt"],
      });

      return apiResponse.success(res, response || {}, 200);
    } catch (err) {
      return apiResponse.success(res, { message: err.message }, 500);
    }
  },

  // for update data from role table
  update: async (req, res) => {
    try{
      const id = req.params.id;

      let data = await Role.findByPk(id, {
        attributes: ["id", "role", "createdAt", "updatedAt"],
      });

      if (!data) {
        return res.json({ message: "Data not found!" });
      }

      const schema = {
        role: "string|optional",
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.status(400).json(validate);
      }

      const response = await data.update(req.body);

      return apiResponse.success(res, response, 200);
    } catch (err) {
      return apiResponse.success(res, { message: err.message }, 500);
    }
  },

  // for delete data from role table
  destroy: async (req, res) => {
    try{
      const id = req.params.id;
      let data = await Role.findByPk(id);

      if (!data) {
        return res.json({ message: "Data not found!" });
      }

      await data.destroy(id);

      return apiResponse.success(res, { message: "Data successfuly deleted!" }, 200);
    } catch (err) {
      return apiResponse.success(res, { message: err.message }, 500);
    }
  }
};