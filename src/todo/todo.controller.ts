import { Body, Controller, Get, Param, Post, Request, UseGuards} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { Todo } from "./todo.entity";
import { TodoService } from "./todo.service";

@Controller('todo')
export class TodoController {
    constructor(private readonly todoservice: TodoService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Request() req, @Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        // req - jwt token, that contains info about authorized user
        return this.todoservice.create(req.user.id, createTodoDto);
    }


    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Request() req): Promise<Todo[]> {
        return this.todoservice.findAll(req.user.id);
    }
    
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number, @Request() req): Promise<Todo> {
        return this.todoservice.findOne(id, req.user.id);
    }


    @UseGuards(JwtAuthGuard)
    @Post(':id/done')
    close(@Param('id') id: number, @Request() req) {
        return this.todoservice.close(id, req.user.id);
    }


    @UseGuards(JwtAuthGuard)
    @Post(':id/status')
    switchStatus(@Param('id') id: number, @Request() req) {
        return this.todoservice.switchStatus(id, req.user.id);
    }
}