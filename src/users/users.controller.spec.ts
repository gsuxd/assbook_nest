import { PrismaService } from '@/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let prisma: PrismaService;
  let controller: UsersController;
  let userId;
  let cookies;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UsersService],
      controllers: [UsersController],
    }).compile();
    controller = module.get<UsersController>(UsersController);
    prisma = module.get<PrismaService>(PrismaService);
    if (userId === undefined) {
      await prisma.user.deleteMany();
    }
  });
  it('Should create a user', async () => {
    const user = await controller.signup({
      email: 'test@test.com',
      password: 'test',
      firstName: 'test',
      lastName: 'test',
      phone: 'test',
      age: 1,
      username: 'test',
    });
    userId = user.id;
    expect(user.email).toBe('test@test.com');
  });

  it('Should login a user', async () => {
    const user = await controller.login({
      username: 'test',
      password: 'test',
    });
    console.log(user);
    expect(user.msg).toBe('User logged in');
  });
});
