import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class UserEntity implements User {
  id: number;
  email: string | null;
  age: number;
  name: string;
  username: string;
  phone: string | null;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsOptional()
  phone: string;
  @IsNumberString()
  age: number;
  @IsNotEmpty()
  username: string;
}

export class FindOneParams {
  @IsNumberString()
  id: number;
}
