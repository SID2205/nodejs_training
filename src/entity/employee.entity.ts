import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne
} from "typeorm";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";

@Entity()
class Employees extends AbstractEntity {
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  age: number;
  @OneToOne(() => Address, (address) => address.employee)
  address: Address;

  @Column({nullable:true})
  password: string;

  @Column({nullable:true})
  role:Role
}

export default Employees;
