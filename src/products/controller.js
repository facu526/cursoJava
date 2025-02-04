const createError = require("http-errors");
const debug = require("debug")("app:module-products-controller");

const { ProductsService } = require("./services");

const { Response } = require("../common/response");

module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
      Response.succes(res, 200, "Lista de productos", products);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let product = await ProductsService.getById(id);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.succes(res, 200, `Producto ${id}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createProduct: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsService.create(body);
        Response.succes(res, 201, "Producto agregado", insertedId);
      }
      const insertedId = await ProductsService.create(body);
      res.json(insertedId);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  //update
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        return Response.error(res, new createError.BadRequest("Datos inválidos"));
      }
      const updated = await ProductsService.update(id, body);
      if (!updated) {
        return Response.error(res, new createError.NotFound("Producto no encontrado"));
      }
      Response.succes(res, 200, `Producto ${id} actualizado`);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  //delete
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await ProductsService.remove(id);
      if (!deleted) {
        return Response.error(res, new createError.NotFound("Producto no encontrado"));
      }
      Response.succes(res, 200, `Producto ${id} eliminado`);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  

  generateReport: (req, res) => {
    try {
      ProductsService.generateReport("Inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
