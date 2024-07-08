import {
  Column,
  Entity,
  OneToOne,
  ManyToOne
} from "typeorm";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";
import Department from "./department.entity";

@Entity()
class Employees extends AbstractEntity {
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  age: number;
  @OneToOne(() => Address, (address) => address.employee, {
    cascade:true,
    onDelete:"CASCADE"

  })
  address: Address;

 @ManyToOne(() => Department, (department) => department.employee) 
   department: Department[]

  @Column({nullable:true})
  password: string;

  
  @Column({nullable:true})
  role:Role

}

export default Employees;
