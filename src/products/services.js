const { ObjectId } = require("mongodb");

const { Database } = require("../database");

const { ProductsUtils } = require("./utils");

const COLLECTION = "products";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) });
};

const create = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
  return result.insertedId;
};

//update
const update = async (id, product) => {
  const collection = await Database(COLLECTION);
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: product }
  );
  return result.modifiedCount > 0;
};

//delete
const remove = async (id) => {
  const collection = await Database(COLLECTION);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

const generateReport = async (name, res) => {
  let products = await getAll();
  ProductsUtils.excelGenerator(products, name, res);
};

module.exports.ProductsService = {
  getAll,
  getById,
  create,
  update,
  remove,
  generateReport,
};
