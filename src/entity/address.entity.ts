import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import AbstractEntity from "./abstract-entity";
import Employees from "./employee.entity";

@Entity()
class Address extends AbstractEntity {
  @Column()
  line1: string;
  @Column()
  pincode: string;
  @OneToOne(() => Employees, (employee) => employee.address,{
    cascade:true,
    onDelete:"CASCADE"

  })
  @JoinColumn()
  employee: Employees;
}

export default Address;
