import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [UsersController],
  providers: [UsersService]
  // exports: [UsersService]
})
export class UsersModule { }