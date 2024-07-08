import EmployeeService from "../service/employee.service";
import express from "express";
import HttpException from "../exceptions/http.exceptions";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";
import { NextFunction } from "express-serve-static-core";
import authorize from "../middleware/authorization";
import { Role } from "../utils/role.enum";
import { RequestWithUser } from "../utils/requestWithUser";


class EmployeeController {
  public router: express.Router;
  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();
    this.router.get("/", this.getAllEmployees);
    this.router.get("/:id", this.getEmployeeById);
    this.router.post("/", authorize, this.createEmployee);
    this.router.delete("/:id", authorize, this.removeEmployee);
    this.router.post("/login", this.loginEmployee);
    this.router.put("/:id", authorize, this.updateEmployees);
  }
  public getAllEmployees = async (
    req: express.Request,
    res: express.Response
  ) => {
    const employees = await this.employeeService.getAllEmployee();
    res.status(200).send(employees);
  };

  public getEmployeeById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const employeeId = Number(req.params.id);
      const employee = await this.employeeService.getEmployeeByID(employeeId);
      if (!employee) {
        const error = new HttpException(404, "NO employee found");
        throw error;
      }
      res.status(200).send(employee);
    } catch (err) {
      next(err);
    }
  };
  public createEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { email, name, address, age, role, password, department } =
        req.body;
      const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!email.match(emailFormat)) {
        throw new HttpException(400, "Invalid email format");
      }
    } catch (error) {
      next(error);
    }

    try {
      const role = req.role;

      if (role !== Role.HR) {
        throw new HttpException(
          403,
          "You are not authorized to create employee"
        );
      }

      const employeeDto = plainToInstance(CreateEmployeeDto, req.body);

      const errors = await validate(employeeDto);
      if (errors.length) {
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedEmployee = await this.employeeService.createEmployee(
        employeeDto.name,
        employeeDto.email,
        employeeDto.address,
        employeeDto.age,
        employeeDto.role,
        employeeDto.password,
        employeeDto.department_id
      );
      res.status(200).send(savedEmployee);

      //
    } catch (error) {
      next(error);
    }
  };

  // public deleteEmployee = async (
  //   req: RequestWithUser,
  //   res: express.Response
  // ) => {

  //   const employeeId = Number(req.params.id);
  //   const employee = await this.employeeService.deleteEmployee(employeeId);
  //   res.status(200).send(employee);
  // };

  public loginEmployee = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    try {
      const token = await this.employeeService.Employeelogin(email, password);
      res.status(200).send({ data: token });
    } catch (error) {
      next(error);
    }
  };

  public removeEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;

      if (role !== Role.HR) {
        throw new HttpException(
          403,
          "You are not authorized to delete employee"
        );
      }
      const employeeId = Number(req.params.id);
      const employee = await this.employeeService.getEmployeeByID(employeeId);
      if (!employee) {
        const error = new HttpException(404, "NO employee found");
        throw error;
      }
      res.status(200).send(employee);
      const employees = await this.employeeService.removeEmployee(employeeId);
      res.status(204).send(employees);
    } catch (err) {
      next(err);
    }
  };

  public updateEmployees = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;

      if (role !== Role.HR) {
        throw new HttpException(
          403,
          "You are not authorized to update employee"
        );
      }
      const employeeDto = plainToInstance(CreateEmployeeDto, req.body);

      const errors = await validate(employeeDto);
      if (errors.length) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const employee = await this.employeeService.getEmployeeByID(
        Number(req.params.id)
      );
      if (!employee) {
        throw new HttpException(
          404,
          `No employees found with ID:${req.params.id}`
        );
      }

      const id = Number(req.params.id);
      const updateEmployee = await this.employeeService.updateEmployee(
        id,
        employeeDto.name,
        employeeDto.email,
        employeeDto.address,
        employeeDto.age,
        employeeDto.department_id
      );
      res.status(200).send(updateEmployee);
    } catch (err) {
      next(err);
    }
  };
}

export default EmployeeController;
// public async deleteEmployee(){

// }
//   public updateEmployee = async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     const employee = await this.employeeService.updateEmployee(
//       Number(req.params.id),
//       req.body
//     );
//     res.status(200).send(employee);
//   };
// }
