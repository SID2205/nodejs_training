
import dataSource from "../db/data-source.db";
import Department from "../entity/department.entity";
import DepartmentController from "../controller/department.controller";
import DepartmentService from "../service/department.service";
import DepartmentRepository from "../repository/department.repository";


const departmentController=new DepartmentController(new DepartmentService(new DepartmentRepository(dataSource.getRepository(Department))));
const departmentRouter= departmentController.router;

export default departmentRouter;