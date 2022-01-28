import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.tdo';
import { User } from './user.entitiy';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.username = createUserDto.userName;
        user.password = createUserDto.password;

        return this.userRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id);
        console.log(user);

        if (!user) {
            throw new NotFoundException(`User with id ${id} does not exist`);
        }

        return user;
    }


    /* 

    addUser(userName: string) {
        const payload = { username: userName };
        const token = this.jwtSerimport { Module } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/user.entitiy";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { TodoController } from "./todo.controller";
import { Todo } from "./todo.entity";
import { TodoService } from "./todo.service";

@Module({vice.sign(payload);
        
        this.users.push(new TodoUser(userName, token));

        return token;
    }


    getUser(token: string) {
        const user = this.users.find(user => user.token === token);
        return {... user};
    } */
}