
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeEnum } from 'src/enums';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }
    /* private readonly users = [
        {
            userId: 1,
            username: 'mikac_inc',
            password: 'inicjativa',
        },
        {
            userId: 2,
            username: 'mikac_inc_2',
            password: 'inicijativa',
        },
    ]; */

    async findOne(username: string): Promise<User | undefined> {
        // return this.users.find(user => user.username === username);
        let user = await this.userRepo.findOneBy({ username });

        if (!user || !user.id) {
            throw new Error('User with that USERNAME not found');
        }

        return user;
    }

    createUser(createUserDto: CreateUserDto): Promise<User | undefined> {
        const user = new User();
        user.email = createUserDto.email;
        user.username = createUserDto.username;
        user.password = createUserDto.password;
        user.type = UserTypeEnum.USER;
        user.dateCreated = new Date();
        user.dateUpdated = new Date();
        return this.userRepo.save(user);
    }
}
