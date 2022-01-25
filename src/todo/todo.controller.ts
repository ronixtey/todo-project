import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { TodoService } from "./todo.service";

@Controller('todo')
export class TodoController {
    constructor(private readonly todoservice: TodoService) { }

    @Post()
    addTask(@Body('title') taskTitle: string) {
        const todoId = this.todoservice.insertTask(taskTitle);
        return { id: todoId }
    }

    @Get()
    getTasks() {   
        return this.todoservice.getTasks();
    }

    @Get(':id')
    getTask(@Param('id') taskId: number) {
        return this.todoservice.getTask(taskId);
    }

    @Post(':id/done') 
    closeTask(@Param('id') taskId: number) {
        this.todoservice.closeTask(taskId);
    }

    @Post(':id/status') 
    switchTask(@Param('id') taskId: number) {
        this.todoservice.switchTask(taskId);
    }
}


