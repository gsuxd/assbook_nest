import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto, FindOneParams } from './users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUser(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  }
  async findOne(params: FindOneParams): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: params.id,
      },
    });
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: await bcrypt.hash(createUserDto.password, 10),
        name: createUserDto.firstName,
        phone: createUserDto.phone,
        age: createUserDto.age,
        username: createUserDto.username,
        profile: {
          create: {
            bio: "I'm amazing",
          },
        },
      },
    });
    return newUser;
  }
}
