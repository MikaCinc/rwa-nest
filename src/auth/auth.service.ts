
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/interfaces';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<IUser | null> {
        const user = await this.usersService.findOne(username);

        if (!user || !user.password) {
            throw new Error('Korisnik nije pronađen.');
        }
        const { password, ...result } = user;
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new Error('Pogrešna lozinka.');
        }
        return result;
    }

    async login(user: User) {
        console.log('login user', user);
        const payload = { username: user.username, sub: user.id };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(createUserDto: CreateUserDto) {
        console.log('register user', createUserDto);
        const { password, ...user } = await this.usersService.createUser(createUserDto);

        const payload = { username: user.username, sub: user.id };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }
}
