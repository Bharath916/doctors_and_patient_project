import mongoose, { Collection } from "mongoose";
const { getCollectionObject } = require("../seed/getModels");

const Schema = mongoose.Schema;

export let schema = new Schema({}, { strict: false, versionKey: false });

//CRUD operations

//====Add api====//
export var add: any = (collectionName: string, data: any) => {
  let startDate: any = new Date();
  if (data && data.length) {
    data = [data];
  }
  return getCollectionObject(collectionName, schema).insertMany(data);
};

//=====Get api====//
export var getData: any = (
  collectionName: string,
  query: any,
  projection: any,
  options: any,
  callback: Function
) => {
  return getCollectionObject(collectionName, schema).find(
    query,
    projection,
    options,
    (err, data) => {
      callback(err, data);
    }
  );
};

//======findOne api=====//
export var GetfindOne = (
  collectionName: string,
  id: string,
  callback: Function
) => {
  return getCollectionObject(collectionName, schema).findById(
    id,
    function (err, data) {
      callback(err, data);
    }
  );
};

//=====update api======//
export var updateData = (collectionName: string, id: string, data: JSON) => {
  return getCollectionObject(collectionName, schema).updateOne(
    { _id: id },
    { $set: data },
    { upsert: false }
  );
};

//======delete api=====//
export var deleteData = (collectionName: string, id: string) => {
  return getCollectionObject(collectionName, schema).delete({ _id: id });
};
