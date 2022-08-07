import { PrismaService } from '@/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let prisma: PrismaService;
  let controller: UsersController;
  let userId;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersController, PrismaService],
    }).compile();
    prisma = module.get<PrismaService>(PrismaService);
    controller = module.get<UsersController>(UsersController);
  });
  beforeAll(async () => {
    await prisma.user.deleteMany();
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
    expect(user.email).toBe('test@test.com');
  });
});
