import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { Todo } from "./todo.entity";

import { TodoService } from "./todo.service";

@Controller('todo')
export class TodoController {
    constructor(private readonly todoservice: TodoService) { }

    @Post()
    async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.todoservice.create(createTodoDto);
    }

    @Get()
    findAll(): Promise<Todo[]> {
        return this.todoservice.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Todo> {
        return this.todoservice.findOne(id);
    }

    @Post(':id/done')
    close(@Param('id') id: number) {
        return this.todoservice.close(id);
    }

    @Post(':id/status')
    switchStatus(@Param('id') id: number) {
        return this.todoservice.switchStatus(id);
    }
}