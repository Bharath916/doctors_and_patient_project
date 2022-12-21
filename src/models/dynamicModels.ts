import mongoose, { Collection } from "mongoose";
const { getCollectionObject } = require("../seed/getModels");

const Schema = mongoose.Schema;

export let schema = new Schema({}, { strict: false, versionKey: false });

//CRUD operations

//====Add api====//
export var add = (collectionName: string, data: any) => {
  let startDate: any = new Date();
  data["createdAt"] = startDate;
  if (data && data.length) {
    data = [data];
  }
  return getCollectionObject(collectionName, schema).insertMany(data);
};

//=====Get api====//
export var getData = (
  collectionName: string,
  query: any,
  projection: any,
  options: any
) => {
  return getCollectionObject(collectionName, schema).find(
    query,
    projection,
    options
  );
};

//======findOne api=====//
export var GetfindOne = (collectionName: string, id: string) => {
  return getCollectionObject(collectionName, schema).findById({ _id: id });
};

//=====update api======//
export var updateData = (collectionName: string, id: string, data: any) => {
  console.log("data", data, id, collectionName);
  let startDate: any = new Date();
  data["updatedAt"] = startDate;
  return getCollectionObject(collectionName, schema).updateOne(
    { _id: id },
    { $set: data },
    { upsert: true }
  );
};

//======delete api=====//
export var deleteData = (collectionName: string, id: string) => {
  return getCollectionObject(collectionName, schema).deleteOne({ _id: id });
};
