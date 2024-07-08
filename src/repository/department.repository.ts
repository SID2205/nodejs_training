import { Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository {
 
  constructor(private repository: Repository<Department>) {}

  async find() {
    return this.repository.find({ relations: { employee: true } });
  }

  async findOneBy(filter: Partial<Department>) {
    return this.repository.findOne({ where: filter, relations: ["employee"] });
  }

  async create(department: Department) {
    return this.repository.save(department);
  }

  async update(department: Department) {
    return this.repository.save(department);
  }
  async delete(id: number) {
    await this.repository.delete(id);
  }

  softRemove = async (department: Department) => {
    return this.repository.softRemove(department);
  };
}

export default DepartmentRepository;
