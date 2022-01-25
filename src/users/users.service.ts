import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TodoUser } from './users.model';

// export type User = any;

@Injectable()
export class UsersService {
    constructor(private jwtService: JwtService) { }

    private readonly users: TodoUser[] = [];

    addUser(userName: string) {
        const payload = { username: userName };
        const token = this.jwtService.sign(payload);

        
        this.users.push(new TodoUser(userName, token));

        return token;
    }

    getUsers() {
        return [... this.users];
    }

    getUser(token: string) {
        const user = this.users.find(user => user.token === token);
        return {... user};
    }



    /* private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
        },
    ]; */

    /* async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    } */
}
