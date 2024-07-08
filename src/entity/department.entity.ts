import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import AbstractEntity from "./abstract-entity";
import Employees from "./employee.entity";

@Entity()
class Department extends AbstractEntity {
  
  @Column()
  department_name: string;

  @OneToMany(() => Employees, (employee) => employee.department)
  employee: Employees[];


}

export default Department;
