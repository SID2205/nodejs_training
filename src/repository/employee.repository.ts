import { DataSource, Repository } from "typeorm";
import dataSource from "../db/data-source.db";
import Employees from "../entity/employee.entity";

class EmployeeRepository {
  //private dataSource: DataSource;
  constructor(private repository: Repository<Employees>) {}

  async find() {
    return this.repository.find({ relations: ["address"] });
  }

  async findOneBy(filter: Partial<Employees>) {
    return this.repository.findOne({ where: filter, relations: ["address"] });
  }

  async create(employee: Employees) {
    return this.repository.save(employee);
  }

  async update(employee:Employees){
    return this.repository.save(employee)
  }
  async delete(id: number) {
    await this.repository.delete(id);
  }

  softRemove=async(employee:Employees)=>{
    return this.repository.softRemove(employee)
  }
}

export default EmployeeRepository;
