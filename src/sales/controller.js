const createError = require("http-errors");
const debug = require("debug")("app:module-sales-controller");
const { SalesService } = require("./services");
const { Response } = require("../common/response");

module.exports.SalesController = {
  getSales: async (req, res) => {
    try {
      let sales = await SalesService.getAll();
      Response.succes(res, 200, "Lista de ventas", sales);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getSale: async (req, res) => {
    try {
      const { id } = req.params;
      let sale = await SalesService.getById(id);
      if (!sale) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.succes(res, 200, `Venta ${id}`, sale);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createSale: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await SalesService.create(body);
        Response.succes(res, 201, "Venta agregada", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteSale: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await SalesService.remove(id);
      if (!deleted) {
        return Response.error(
          res,
          new createError.NotFound("Venta no encontrada")
        );
      }
      Response.succes(res, 200, `Venta ${id} eliminada`);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
