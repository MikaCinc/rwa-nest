
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeEnum } from 'src/enums';
import { Pitanje } from 'src/pitanje/entities/pitanje.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Pitanje) private pitRepo: Repository<Pitanje>
    ) { }
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
        let user = await this.userRepo.findOne({
            where: { username },
            relations: ['favourites']
        });

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
        user.favourites = [];
        user.dateCreated = new Date();
        user.dateUpdated = new Date();
        return this.userRepo.save(user);
    }

    async toggleFavourite(id: number, userId: number): Promise<User> {
        let user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['favourites']
        });

        if (!user || !user.id) {
            throw new Error('User with that ID not found');
        }
        const isCurrentlyFavourite = !!user.favourites.find(favourite => favourite.id === id);
        let pitanje;
        if (!isCurrentlyFavourite) {
            pitanje = await this.pitRepo.findOneBy({ id });
        }
        console.log('toggleFav', user, isCurrentlyFavourite, pitanje);
        const newFavourites = isCurrentlyFavourite
            ? user.favourites.filter(fav => fav.id !== id)
            : [...user.favourites, pitanje];

        user.favourites = newFavourites;

        /* const result = await this.userRepo.update(userId, { favourites: newFavourites });
        return !!result.affected; */
        const result = await this.userRepo.save(user);
        return result;
    }
}
