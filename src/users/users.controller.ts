import { LocalAuthGuard } from '@/auth/guards/local.auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, FindOneParams, UserEntity } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    return { User: req.user, msg: 'User logged in' };
  }
  @Post('signup/')
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersService.create(createUserDto);
    return new UserEntity(user);
  }
  @Get('/protected')
  async protected(@Request() req): Promise<UserEntity> {
    return new UserEntity(req.user);
  }
  @Get(':id')
  async findOne(@Param() params: FindOneParams): Promise<UserEntity> {
    return new UserEntity(await this.usersService.findOne(params));
  }
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'Logged out' };
  }
}
