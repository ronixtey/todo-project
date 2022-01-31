import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { Todo } from "./todo.entity";
import { TodoService } from "./todo.service";

@UseGuards(JwtAuthGuard)
@ApiTags('todo')
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
    constructor(private readonly todoservice: TodoService) { }

    @Post()
    @ApiCreatedResponse({ description: 'Create new todo item' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBody({ type: CreateTodoDto })
    async create(@Request() req, @Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        // req - jwt token, that contains info about authorized user
        return this.todoservice.create(req.user.id, createTodoDto);
    }


    @Get()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiNotFoundResponse({ description: 'User does not have any todo item' })
    @ApiOkResponse({ description: 'List all current user\'s todo lists' })
    findAll(@Request() req): Promise<Todo[]> {
        return this.todoservice.findAll(req.user.id);
    }


    @Get(':id')
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiNotFoundResponse({ description: 'User does not have todo item with specified id' })
    @ApiOkResponse({ description: 'List current user\'s todo list by id' })
    findOne(@Param('id') id: number, @Request() req): Promise<Todo> {
        return this.todoservice.findOne(id, req.user.id);
    }


    @Post(':id/done')
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiNotFoundResponse({ description: 'User does not have todo item with specified id' })
    @ApiCreatedResponse({ description: 'Close todo item' })
    close(@Param('id') id: number, @Request() req) {
        return this.todoservice.close(id, req.user.id);
    }


    @Post(':id/status')
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiNotFoundResponse({ description: 'User does not have todo item with specified id' })
    @ApiCreatedResponse({ description: 'Switch status of the todo item' })
    switchStatus(@Param('id') id: number, @Request() req) {
        return this.todoservice.switchStatus(id, req.user.id);
    }
}