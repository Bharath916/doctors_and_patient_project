require("dotenv").config();

export let config = {
  serviceName: process.env.SERVICE || "BK_SERVICE",
  mongodbURI:
    process.env.MONGO_DB_URI || "mongodb://localhost:27017/fidioBkService",
  port: process.env.PORT || 9090,
  dynamicModels: new Array(),
};
