import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }


    @Post('login')
    addUser(@Body('username') userName: string) {
        return this.usersService.addUser(userName);
    }

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Get('user')
    getUser(@Body('token') token) {
        return this.usersService.getUser(token);
    }
    


/*     @Get('user')
    user() {
        return this.usersService.user();
    } */
}
