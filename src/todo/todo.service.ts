import { Injectable } from "@nestjs/common";

@Injectable() 
export class TodoService {
    insertTask(title: string) {
        const taskId = 1;
        return taskId;
    }    

    getTasks() {
    }

    getTask(taskId: number) {
        // 
    }

    closeTask(taskId: number) {

    }

    switchTask(taskId: number) {

    }
}