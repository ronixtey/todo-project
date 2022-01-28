import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { Todo } from "./todo.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class TodoService {
    constructor(private usersService: UsersService) { }

    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const todo = new Todo();
        todo.name = createTodoDto.name;
        todo.user = await this.usersService.findOne(createTodoDto.userId);

        return Todo.save(todo);
    }

    findAll(): Promise<Todo[]> {
        return Todo.find();
    }

    findOne(id: number): Promise<Todo> {
        return this.getTask(id);
    }

    async close(id: number) {
        const todo = await this.getTask(id);
        todo.isCompleted = true;

        return Todo.save(todo);
    }

    async switchStatus(id: number) {
        const todo = await this.getTask(id);
        todo.isCompleted = !todo.isCompleted;

        return Todo.save(todo);
    }


    private async getTask(id: number) {
        const todo = await Todo.findOne(id, { relations: ['user'] });
        if (!todo) {
            throw new NotFoundException();
        }

        return todo;
    }
}