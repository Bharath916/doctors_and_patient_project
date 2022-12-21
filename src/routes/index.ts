import express from "express";
import * as ControllersData from "../controllers/index";
import { entryPoint } from "../middleware/entryPoint";
import { exitPoint } from "../middleware/exitPoint";

let router = express.Router();

//All CRUD operations

router.post(
  "/addData/:collectionName",
  entryPoint,
  ControllersData.createData,
  exitPoint
);

router.get(
  "/getAllData/:collectionName",
  entryPoint,
  ControllersData.getData,
  exitPoint
);

router.post(
  "/getOneData/:collectionName/:id",
  entryPoint,
  ControllersData.getOneData,
  exitPoint
);

router.put(
  "/updateData/:collectionName/:id",
  entryPoint,
  ControllersData.UpdateData,
  exitPoint
);

router.delete(
  "/deleteData/:collectionName/:id",
  entryPoint,
  ControllersData.deleteData,
  exitPoint
);

module.exports = router;
