import { Request, Response, NextFunction } from "express";
import { ErrorCodes } from "../models/models";
import * as DynamicModel from "../models/dynamicModels";

//Add logic
export async function createData(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    let collectionName: any = req.params.collectionName;
    let newRecord = req.body;

    if (!collectionName || !newRecord) {
      req.apiStatus = {
        isSuccess: false,
        error: ErrorCodes[1001],
        customMsg: "Missing collection name || new record",
        data: {},
      };
      next();
      return;
    }
    let addRecord = await DynamicModel.add(collectionName, newRecord);

    if (addRecord) {
      req.apiStatus = {
        isSuccess: true,
        data: "Added successfully",
      };
      next();
    } else {
      req.apiStatus = {
        isSuccess: false,
        error: ErrorCodes[1001],
        data: {},
      };
      next();
      return;
    }
  } catch (error) {
    req.apiStatus = {
      isSuccess: false,
      error: ErrorCodes[1002],
      customMsg: "Failed to add data",
      data: {},
    };
    next();
    return;
  }
}
