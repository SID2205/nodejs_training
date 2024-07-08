import { error } from "console";
import Address from "../entity/address.entity";
import Employees from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import HttpException from "../exceptions/http.exceptions";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { tokenToString } from "typescript";
import { jwtPayload } from "../utils/jwtPayload";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import Department from "../entity/department.entity";

class EmployeeService {
  //private employeeRepository: EmployeeRepository;
  constructor(private employeeRepository: EmployeeRepository) {}
  //this.employeeRepository=new EmployeeRepository();

  async getAllEmployee() {
    return this.employeeRepository.find();
  }

  async getEmployeeByID(id: number) {
    return this.employeeRepository.findOneBy({ id });
  }

  async Employeelogin(email: string, password: string) {
    const employee = await this.employeeRepository.findOneBy({ email });

    if (!employee) {
      throw new HttpException(404, "USER NOT FOUND WITH THIS EMAIL");
    }

    const result = await bcrypt.compare(password, employee.password);

    if (!result) {
      throw new HttpException(404, "Incorrect passowrd");
    }

    const payload: jwtPayload = {
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };

    const token = jsonwebtoken.sign(payload, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });

    return { token };
  }

  async createEmployee(
    name: string,
    email: string,
    address: any,
    age: number,
    role: Role,
    password: string,
    department: any
  ) {
    const newEmployee = new Employees();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.address = address;
    newEmployee.age = age;
    newEmployee.department=department;

    newEmployee.password = await bcrypt.hash(password, 10);
    newEmployee.role = role;

    const newAddress = new Address();
    newAddress.line1 = address.line1;
    newAddress.pincode = address.pincode;
    newEmployee.address = newAddress;

    const newEmp = await this.employeeRepository.create(newEmployee);
    console.log('newEmp', newEmp);
    return newEmp;
  }

  async updateEmployee(
    id: number,
    name: string,
    email: string,
    address: any,
    age: number,
    department_id:any
  ) {
    const employee = await this.employeeRepository.findOneBy({ id });

    employee.name = name;

    employee.email = email;

    employee.age = age;

    employee.address.line1 = address.line1;

    employee.address.pincode = address.pincode;
    employee.department=department_id;
    return this.employeeRepository.create(employee);
  }

  async deleteEmployee(id: number) {
    return this.employeeRepository.delete(id);
  }

  // async updateEmployee(id: number, details: Partial<Employees>) {
  //   const employee = await this.employeeRepository.findOneBy({ id });
  //   employee.name = details.name;
  //   employee.email = details.email;
  //   employee.age = details.age;
  //   employee.address.line1 = details.address?.line1;
  //   employee.address.pincode = details.address?.pincode;
  //   return this.employeeRepository.create(employee);
  // }

  removeEmployee = async (id: number): Promise<Employees> => {
    const employee = await this.employeeRepository.findOneBy({ id });
    return this.employeeRepository.softRemove(employee);
  };
}

export default EmployeeService;
