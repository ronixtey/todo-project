import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { Todo } from "./todo.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class TodoService {
    constructor(
        private usersService: UsersService
    ) { }

    async create(userId: number, createTodoDto: CreateTodoDto): Promise<Todo> {
        const todo = new Todo();
        todo.name = createTodoDto.name;
        // assign current authorized user
        todo.user = await this.usersService.findOne(userId);

        return Todo.save(todo);
    }

    findAll(userId: number): Promise<Todo[]> {
        return Todo.find({
            where: { user: userId }
        });
    }

    findOne(id: number, userId: number): Promise<Todo> {
        return this.getTask(id, userId);
    }

    async close(id: number, userId: number) {
        const todo = await this.getTask(id, userId);
        todo.isCompleted = true;

        return Todo.save(todo);
    }

    async switchStatus(id: number, userId: number) {
        const todo = await this.getTask(id, userId);
        todo.isCompleted = !todo.isCompleted;

        return Todo.save(todo);
    }

    private async getTask(id: number, userId: number) {
        const todo = await Todo.findOne({ where: { id: id, user: userId } }/* , { relations: ['user'] } */);
        if (!todo) {
            throw new NotFoundException();
        }

        return todo;
    }
}