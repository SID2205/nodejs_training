import { error } from "console";
import EmployeeService from "../service/employee.service";
import express from "express";
import HttpException from "../exceptions/http.exceptions";
import { plainToClass, plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";
import { NextFunction } from "express-serve-static-core";
import authorize from "../middleware/authorization";

class EmployeeController {
  //private employeeService: EmployeeService;
  public router: express.Router;
  constructor(private employeeService: EmployeeService) {
    // this.employeeService = new EmployeeService();
    this.router = express.Router();
    this.router.get("/", this.getAllEmployees);
    this.router.get("/:id", this.getEmployeeById);
    this.router.post("/",this.createEmployee);
    this.router.delete("/:id", this.removeEmployee);
    this.router.post("/login",this.loginEmployee);
    
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
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { email, name, address, age, role, password } = req.body;
      const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!email.match(emailFormat)) {
        throw new HttpException(400, "Invalid email format");
        return;
      }
    } catch (error) {
      next(error);
    }

    try {
      const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employeeDto);
      if (errors.length) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedEmployee = await this.employeeService.createEmployee(
        employeeDto.name,
        employeeDto.email,
        employeeDto.address,
        employeeDto.age,
        employeeDto.role,
        employeeDto.password
      );
      res.status(200).send(savedEmployee);

      //
    } catch (error) {
      next(error);
    }
  };

  // public UpdateEmployee=async(req.express.Request, res.express.Response)=>{
  //   try{
  //     const emplyeeDto=plainToInstance(Update)
  //   }
  // }

  public deleteEmployee = async (
    req: express.Request,
    res: express.Response
  ) => {
    const employeeId = Number(req.params.id);
    const employee = await this.employeeService.deleteEmployee(employeeId);
    res.status(200).send(employee);
  };

public loginEmployee=async(
  req:express.Request,
  res:express.Response,
  next: NextFunction
)=>{
  const{email,password}=req.body;
  try{
    const token=await this.employeeService.Employeelogin(email,password);
    res.status(200).send({data:token});
  }catch(error){
    next(error);
  }
}


  public removeEmployee = async (
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
      const employees = await this.employeeService.removeEmployee(employeeId);
      res.status(204).send(employees);
    } catch (err) {
      next(err);
    }
  };

  // public async deleteEmployee(){

  // }
}

export default EmployeeController;
