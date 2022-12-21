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

//getData
export async function getData(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    let collectionName = req.params.collectionName;
    console.log("req", collectionName);

    if (!collectionName) {
      (req.apiStatus = {
        isSuccess: false,
        error: ErrorCodes[1001],
        data: {},
      }),
        next();
      return;
    }
    let findData = await DynamicModel.getData(collectionName, {}, {}, {});
    // console.log("findData", findData);

    if (findData && findData.length) {
      (req.apiStatus = {
        isSuccess: true,
        customMsg: "data fetched successfully",
        data: findData,
      }),
        next();
      // return;
    }
  } catch (error) {
    (req.apiStatus = {
      isSuccess: false,
      error: ErrorCodes[1004],
      customMsg: "FAILED TO FETCH DATA",
      data: {},
    }),
      next();
    return;
  }
}

//getOne data

export async function getOneData(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    let collectionName: any = req.params.collectionName;
    let id: any = req.params.id;

    if (!collectionName && !id) {
      req.apiStatus = {
        isSuccess: false,
        error: ErrorCodes[1001],
        customMsg: "Missing collection name || id",
        data: {},
      };
      next();
      return;
    }

    let getOneDataById = await DynamicModel.GetfindOne(collectionName, id);
    if (getOneDataById) {
      req.apiStatus = {
        isSuccess: true,
        customMsg: "DATA FETCH SUCCESSFULL",
        data: getOneDataById,
      };
      next();
      return;
    } else {
      req.apiStatus = {
        isSuccess: false,
        error: ErrorCodes[1004],
        customMsg: "FAILED TO FETCH DATA",
        data: {},
      };
      next();
      return;
    }
  } catch (error) {
    req.apiStatus = {
      isSuccess: false,
      error: ErrorCodes[1004],
      customMsg: "FAILED TO FETCH DATA 2222",
      data: {},
    };
    next();
    return;
  }
}

//update functionality
export async function UpdateData(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    let collectionName: any = req.params.collectionName;
    let id: any = req.params.id;
    let body: any = req.body;

    if (!collectionName && !id && !body) {
      (req.apiStatus = {
        isSuccess: false,
        error: ErrorCodes[1001],
        customMsg: "Missing collection name || new record",
        data: {},
      }),
        next();
      return;
    }

    let updatedData = await DynamicModel.updateData(collectionName, id, body);
    console.log("updatedData", updatedData);

    if (updatedData) {
      req.apiStatus = {
        isSuccess: true,
        customMsg: "DATA UPDATE SUCCESSFULLY",
        data: {},
      };
      next();
    } else {
      req.apiStatus = {
        isSuccess: false,
        error: ErrorCodes[1007],
        customMsg: "FAILED TO UPDATE DATA",
        data: {},
      };
      next();
      return;
    }
  } catch (error) {
    req.apiStatus = {
      isSuccess: false,
      error: ErrorCodes[1007],
      customMsg: "FAILED TO UPDATE DATA",
      data: {},
    };
    next();
    return;
  }
}

//delete record
export async function deleteData(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    let collectionName: any = req.params.collectionName;
    let id: any = req.params.id;

    if (!collectionName && !id) {
      req.apiStatus = {
        isSuccess: false,
        error: ErrorCodes[1001],
        customMsg: "Missing collection name || new record",
        data: {},
      };
      next();
      return;
    }

    let deleteRecord = await DynamicModel.deleteData(collectionName, id);
    // console.log("deleteRecord", deleteRecord);
    if (deleteRecord) {
      req.apiStatus = {
        isSuccess: true,
        customMsg: "DATA DELETE SUCCESSFULL",
        data: {},
      };
      next();
    } else {
      req.apiStatus = {
        isSuccess: false,
        error: ErrorCodes[1005],
        customMsg: "FAILED TO DELETE DATA 232323",
        data: {},
      };
      next();
      return;
    }
  } catch (error) {
    req.apiStatus = {
      isSuccess: false,
      error: ErrorCodes[1008],
      customMsg: "FAILED TO DELETE DATA",
      data: {},
    };
    next();
    return;
  }
}
