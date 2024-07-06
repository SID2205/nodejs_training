import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
  ValidateNested,
  isEnum,
  isNotEmpty,
  isString,
} from "class-validator";
import { CreateAddressDto } from "./address.dto";
import { Type } from "class-transformer";
import "reflect-metadata";
import { Role } from "../utils/role.enum";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

 
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  
}
