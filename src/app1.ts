import express from "express";
import employeeRouter from "./routes/employee.routes";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import errorMiddleware from "./middleware/error.middleware";
import departmentRouter from "./routes/department.routes";


const server = express();

server.use(bodyParser.json());
server.use(loggerMiddleware);
server.use("/employee", employeeRouter);
server.use("/department",departmentRouter);
server.use(errorMiddleware);

(async () => {
  try {
    await dataSource.initialize();
  } catch (e) {
    console.log("Failed", e);
    process.exit(1);
  }
  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
})();
