import { DataSource, Repository } from "typeorm";
import dataSource from "../db/data-source.db";

import { constants } from "buffer";
import Department from "../entity/department.entity";

class DepartmentRepository {
  //private dataSource: DataSource;
  constructor(private repository: Repository<Department>) {}

  async find() {
    return this.repository.find();
  }

  async findOneBy(filter: Partial<Department>) {
    return this.repository.findOne({ where: filter, relations: ["id"] });
  }

  async create(department: Department) {
    return this.repository.save(department);
  }

  async update(department:Department){
    return this.repository.save(department)
  }
  async delete(id: number) {
    await this.repository.delete(id);
  }

  softRemove=async(department:Department)=>{
    return this.repository.softRemove(department)
  }
}

export default DepartmentRepository;
