import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto {
    @ApiProperty({ type: String, description: 'Name of the task' })
    name: string;
}