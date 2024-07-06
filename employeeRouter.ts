import express from "express";
import { Request, Response } from "express";
import Employees from "./src/entity/employee.entity";
import dataSource from "./src/db/data-source.db";
import employeeRouter from "./src/routes/employee.routes";
//const employeeRouter = express.Router();

// const employees: Employee[] = [
//   {
//     id: 1,
//     email: "employee1@gmail.com",
//     name: "Employee1",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     deletedAt:new Date(),
//   },
//   {
//     id: 2,
//     email: "employee2@gmail.com",
//     name: "Employee2",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     deletedAt: new Date()
//   },
// ];

employeeRouter.get("/", async (req: Request, res: Response) => {
  const employeeRepository = dataSource.getRepository(Employees);
  const employee = await employeeRepository.find();
  //console.log(req.params["id"]);
  //   const employee_id = employee.find(
  //        (record) => record.id === Number(req.params.id)
  //      );
  res.status(200).send(employee);
});

employeeRouter.get("/:id", async (req: Request, res: Response) => {
  const employeeRepository = dataSource.getRepository(Employees);
  const employee = await employeeRepository.findOneBy({
    id: Number(req.params.id),
  });
  //console.log(req.params["id"]);
  //   const employee_id = employee.find(
  //        (record) => record.id === Number(req.params.id)
  //      );
  res.status(200).send(employee);
});

// employeeRouter.put("/:id", (req: Request, res: Response) => {
//   console.log(req.url);
//   const employee = employees.find(
//     (record) => record.id == Number(req.params.id)
//   );
//   employee.email = req.body.email;
//   employee.name = req.body.body;
//   res.status(200).send(employee);
// });

// employeeRouter.post("/", (req: Request, res: Response) => {
//   console.log(req.body);
//   const newEmployee = new Employee();
//   newEmployee.id = employees.length+1;
//   newEmployee.email = req.body.email;
//   newEmployee.name = req.body.name;
//   newEmployee.createdAt = new Date();
//   newEmployee.updatedAt = new Date();
//   employees.push(newEmployee);
//   res.status(201).send(newEmployee);
// });

employeeRouter.post("/", async (req: Request, res: Response) => {
  const employeeRepository = dataSource.getRepository(Employees);
  const newEmployee = new Employees();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  const savedEmployee = await employeeRepository.save(newEmployee);
  res.status(200).send(savedEmployee);
});

employeeRouter.put("/:id", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employees);
  const employee = await employeeRepository.findOneBy({
    id: Number(req.params.id),
  });
  employee.email = req.body.email;
  employee.name = req.body.name;
  const updatedEmployee = await employeeRepository.save(employee);
  res.status(200).send(updatedEmployee);
});

// employeeRouter.delete("/:id", (req: Request, res: Response) => {
//   console.log(req.url);
//   const index = employees.findIndex(
//     (record) => record.id == Number(req.params.id)
//   );
//   employees.splice(index, 1);
//   res.status(200).send(employees);
// });

employeeRouter.delete("/:id", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employees);
  const result = await employeeRepository.softDelete(Number(req.params.id));
  res.status(200).send(result);
});

export default employeeRouter;
