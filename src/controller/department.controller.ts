import { error } from "console";

import express from "express";
import HttpException from "../exceptions/http.exceptions";
import { plainToClass, plainToInstance } from "class-transformer";

import { validate } from "class-validator";
import { NextFunction } from "express-serve-static-core";
import authorize from "../middleware/authorization";
import { Role } from "../utils/role.enum";
import { CreateDepartmentDto } from "../dto/department.dto";
import DepartmentService from "../service/department.service";
import { RequestWithUser } from "../utils/requestWithUser";

class DepartmentController {
  
  public router: express.Router;
  constructor(private departmentService: DepartmentService) {
    
    this.router = express.Router();
    this.router.get("/", this.getAllDepartment);
    this.router.get("/:id", this.getDepartmentById);
    this.router.post("/",authorize,this.createDepartment);
    this.router.put("/:id",authorize, this.updateDepartment);
    this.router.delete("/:id", authorize,this.removeDepartment);
    
  }
  public getAllDepartment = async (
    req: express.Request,
    res: express.Response
  ) => {
    const department = await this.departmentService.getAllDepartment();
    res.status(200).send(department);
  };

  public getDepartmentById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const departmentId = Number(req.params.id);
      const department = await this.departmentService.getDepartmentByID(departmentId);
      if (!department) {
        const error = new HttpException(404, "No department found");
        throw error;
      }
      res.status(200).send(department);
    } catch (err) {
      next(err);
    }
  };

  
  public createDepartment = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {try{
      const role=req.role;
      if(role!=Role.HR){
        throw new HttpException(
          403,
          "You are not authorized to create department"
        );

      }
      const departmentDto = plainToInstance(CreateDepartmentDto, req.body);
      const errors = await validate(departmentDto);
      if (errors.length) {

        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedDepartment = await this.departmentService.createDepartment(
        departmentDto.department_name
      );
      res.status(200).send(savedDepartment);

      //
    } catch (error) {
      next(error);
    }
  };

  // public deleteDepartment = async (
  //   req: express.Request,
  //   res: express.Response
  // ) => {
  //   const departmentId = Number(req.params.id);
  //   const department = await this.departmentService.deleteEmployee(departmentId);
  //   res.status(200).send(department);
  // };



  public removeDepartment = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;

      if (role !== Role.HR) {
        throw new HttpException(
          403,
          "You are not authorized to delete department"
        );
      }
      const departmentId = Number(req.params.id);
      const department = await this.departmentService.getDepartmentByID(departmentId);
      if (!department) {
        const error = new HttpException(404, "No department found");
        throw error;
      }
  
      const removedDepartment = await this.departmentService.removeEmployee(departmentId);
      res.status(204).send(removedDepartment);
    } catch (err) {
      next(err);
    }
  };

  public updateDepartment = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;

      if (role !== Role.HR) {
        throw new HttpException(
          403,
          "You are not authorized to create employee"
        );
      }
      const departmentDto = plainToInstance(CreateDepartmentDto, req.body);

      const errors = await validate(departmentDto);
      if (errors.length) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const department = await this.departmentService.getDepartmentByID(
        Number(req.params.id)
      );
      if (!department) {
        throw new HttpException(
          404,
          `No department found with ID:${req.params.id}`
        );
        
      }

      const id = Number(req.params.id);
      const updateDepartment = await this.departmentService.updateDepartment(
        id,
        departmentDto.department_name,
      );
      res.status(200).send(updateDepartment);
    } catch (err) {
      next(err);
    }
  };
}

export default DepartmentController;

