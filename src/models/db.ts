import mongoose, { ConnectOptions } from "mongoose";

export class DB {
  private static db: any;
  public getDB() {
    return DB.db;
  }
  public connectWithRetry(uri: string) {
    let Mongoose: any = mongoose.connect(uri, {
      autoIndex: true,
      // bufferMaxEntries: 0,
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    (err: Error) => {
      if (err) {
        console.log(
          "Mongoose failed initials connection. Retrying in 5 seconds..."
        );
        setTimeout(() => {
          this.connectWithRetry(uri);
        }, 5000);
      } else {
        mongoose.Promise = global.Promise;
        DB.db = mongoose.connection;
      }
    };
    return Mongoose;
  }

  public connctionClose(callback: Function) {
    mongoose.connection.close(function () {
      console.log("Mongoose connection closed.");
      if (callback) {
        callback();
      }
    });
  }
}

mongoose.connection.on("error", function (err) {
  console.log("Mongoose error:", +err);
});

mongoose.connection.on("connected", function () {
  console.log("Mongoose connected");
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});
