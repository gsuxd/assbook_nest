import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/strategies/local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [LocalStrategy, AuthService],
})
export class AppModule {}
