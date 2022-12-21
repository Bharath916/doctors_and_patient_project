import mongoose = require("mongoose");
import { config } from "../config/config";

export function getCollectionObject(collectionName: string, Schema: any) {
  let collectionExists: any = false;
  let collection: any = {};
  try {
    for (var i = 0; i < config.dynamicModels.length; i++) {
      if (config.dynamicModels[i]["name"] === collectionName) {
        collection = config.dynamicModels[i];
        collectionExists = true;
        break;
      }
    }

    if (!collectionExists) {
      collection["name"] = collectionName;
      collection["model"] = mongoose.model(
        collectionName,
        Schema,
        collectionName
      );
      config.dynamicModels.push(collection);
    }
  } catch (error) {
    console.log("error", error);
  }
  return collection["model"];
}
