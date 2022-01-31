import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { Todo } from "./todo.entity";
import { TodoService } from "./todo.service";

@Controller('todo')
export class TodoController {
    constructor(private readonly todoservice: TodoService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'Create new todo item' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiHeader({ name: 'Token', description: 'JWT Token' })
    @ApiBody({ type: CreateTodoDto })
    async create(@Request() req, @Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        // req - jwt token, that contains info about authorized user
        return this.todoservice.create(req.user.id, createTodoDto);
    }


    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiNotFoundResponse({ description: 'User does not have any todo item' })
    @ApiOkResponse({ description: 'List all current user\'s todo lists' })
    @ApiHeader({ name: 'Token', description: 'JWT Token' })
    findAll(@Request() req): Promise<Todo[]> {
        return this.todoservice.findAll(req.user.id);
    }


    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiNotFoundResponse({ description: 'User does not have todo item with specified id' })
    @ApiOkResponse({ description: 'List current user\'s todo list by id' })
    @ApiHeader({ name: 'Token', description: 'JWT Token' })
    findOne(@Param('id') id: number, @Request() req): Promise<Todo> {
        return this.todoservice.findOne(id, req.user.id);
    }


    @Post(':id/done')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiNotFoundResponse({ description: 'User does not have todo item with specified id' })
    @ApiCreatedResponse({ description: 'Close todo item' })
    close(@Param('id') id: number, @Request() req) {
        return this.todoservice.close(id, req.user.id);
    }


    @UseGuards(JwtAuthGuard)
    @Post(':id/status')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiNotFoundResponse({ description: 'User does not have todo item with specified id' })
    @ApiCreatedResponse({ description: 'Switch status of the todo item' })
    switchStatus(@Param('id') id: number, @Request() req) {
        return this.todoservice.switchStatus(id, req.user.id);
    }
}