import { error } from "console";



import { Role } from "../utils/role.enum";
import HttpException from "../exceptions/http.exceptions";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { tokenToString } from "typescript";

import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService {
  
  constructor(private departmentRepository: DepartmentRepository) {}
  

  async getAllDepartment() {
    return this.departmentRepository.find();
  }

  async getDepartmentByID(id: number) {
    return this.departmentRepository.findOneBy({ id });
  }

  

  async createDepartment(
    name: string
  ) {
    const newDepartment = new Department();
    newDepartment.department_name = name;

    return this.departmentRepository.create(newDepartment);
  }

  async updateDepartment(
    id: number,
    name: string,
  ) {
    const department = await this.departmentRepository.findOneBy({ id });

    department.department_name = name;

    return this.departmentRepository.create(department);
  }

  async deleteEmployee(id: number) {
    return this.departmentRepository.delete(id);
  }

  

  removeEmployee = async (id: number): Promise<Department> => {
    const department = await this.departmentRepository.findOneBy({ id });
    return this.departmentRepository.softRemove(department);
  };
}

export default DepartmentService;