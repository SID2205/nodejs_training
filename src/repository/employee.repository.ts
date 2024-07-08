import {Repository } from "typeorm";

import Employees from "../entity/employee.entity";

class EmployeeRepository {
  
  constructor(private repository: Repository<Employees>) {}

  async find() {
    return this.repository.find({ relations: ["address", "department"] });
  }

  async findOneBy(filter: Partial<Employees>) {
    return this.repository.findOne({ where: filter, relations: ["address"] });
  }

  async create(employee: Employees) {
    return this.repository.save(employee);
  }

  async update(employee: Employees) {
    return this.repository.save(employee);
  }
  async delete(id: number) {
    await this.repository.delete(id);
  }

  softRemove = async (employee: Employees) => {
    return this.repository.softRemove(employee);
  };
}

export default EmployeeRepository;
