
import express from "express";
import { Request, Response } from "express";

import employeeRouter from "./routes/employee.routes";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import { error } from "console";
import errorMiddleware from "./middleware/error.middleware";
import departmentRouter from "./routes/department.routes";


const server = express();

server.use(bodyParser.json());
server.use(loggerMiddleware);
server.use("/employee", employeeRouter);
server.use("/department",departmentRouter);



server.use(errorMiddleware);
// server.use((err:Error,req,res,next)=>{
//   console.error(err.stack);
//   if(err instanceof HttpException){
//     res.status(err.status).send({err:err.message})
//   }
//   res.status(500).send({error:err.message})
// })

// server.get("/employee/:id", (req: Request, res: Response) => {
//   console.log(req.url);
//   res.status(200).send("Sidharth Venugopal");
// });

// server.put("/employee", (req: Request, res: Response) => {
//   console.log(req.url);
//   res.status(200).send("put");
// });

// server.post("/employee", (req: Request, res: Response) => {
//   console.log(req.url);
//   res.status(201).send("post");
// });

// server.delete("/employee/:id", (req: Request, res: Response) => {
//   console.log(req.url);
//   res.status(200).send("delete");
// });

// interface profile {
//   name: string;
//   age: number;
// }

// interface data {
//   profile: profile;
// }

// server.get("/getData", (req: Request, res: Response) => {
//   let data: data = {
//     profile: {
//       name: "Sidharth Venugopal",
//       age: 23,
//     },
//   };

//   console.log(data.profile.name);
//   res.status(200).send(data);
// });

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
