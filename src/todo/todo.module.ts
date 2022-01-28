import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { TodoController } from "./todo.controller";
import { Todo } from "./todo.entity";
import { TodoService } from "./todo.service";

@Module({
    imports: [TypeOrmModule.forFeature([Todo]), UsersModule],
    controllers: [TodoController],
    providers: [TodoService]
})
export class TodoModule { }