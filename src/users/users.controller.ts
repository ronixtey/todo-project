import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.tdo";
import { User } from "./user.entitiy";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('create')
    @ApiCreatedResponse({ description: 'User registration' })
    @ApiBody({type: CreateUserDto}) 
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    /* @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findOne(id);
    } */
}