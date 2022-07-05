
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user-dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) { // @todo bcrypt
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        console.log('login user', user);
        const payload = { username: user.username, sub: user.id };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(createUserDto: CreateUserDto) {
        console.log('register user', createUserDto);
        const user = await this.usersService.createUser(createUserDto);

        const payload = { username: user.username, sub: user.id };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }
}
