import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    TodoModule,
    UsersModule,
/*     JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }) */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}