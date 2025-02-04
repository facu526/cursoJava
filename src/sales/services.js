const { ObjectId } = require("mongodb");
const { Database } = require("../database");

const COLLECTION = "sales";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) });
};

const create = async (sale) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(sale);
  return result.insertedId;
};

const remove = async (id) => {
  const collection = await Database(COLLECTION);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

module.exports.SalesService = {
  getAll,
  getById,
  create,
  remove,
};
