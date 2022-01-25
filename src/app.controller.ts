import { Controller, Get, Post, Request, UseGuards, Body} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

/*   @Get()
  getHello(): string {
    return this.appService.getHello();
  }
 */

  // @UseGuards(AuthGuard('local'))
  
}
