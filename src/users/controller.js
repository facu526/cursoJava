const createError = require("http-errors");
const debug = require("debug")("app:module-users-controller");

const { UsersService } = require("./services");

const { Response } = require("../common/response");

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll();
      Response.succes(res, 200, "Lista de usuarios", users);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let user = await UsersService.getById(id);
      if (!user) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.succes(res, 200, `User ${id}`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await UsersService.create(body);
        Response.succes(res, 201, "Usuario agregado", insertedId);
      }
      const insertedId = await ProductsService.create(body);
      res.json(insertedId);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  //update
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        return Response.error(
          res,
          new createError.BadRequest("Datos inválidos")
        );
      }
      const updated = await UsersService.update(id, body);
      if (!updated) {
        return Response.error(
          res,
          new createError.NotFound("Usuario no encontrado")
        );
      }
      Response.succes(res, 200, `Usuario ${id} actualizado`);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  //delete
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await UsersService.remove(id);
      if (!deleted) {
        return Response.error(
          res,
          new createError.NotFound("Usuario no encontrado")
        );
      }
      Response.succes(res, 200, `Usuario ${id} eliminado`);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
