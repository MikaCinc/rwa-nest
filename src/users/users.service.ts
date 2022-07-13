
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeEnum } from 'src/enums';
import { Pitanje } from 'src/pitanje/entities/pitanje.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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
        let user: User = await this.userRepo.findOne({
            where: { username },
            relations: ['favourites', 'favourites.categories'],
        });

        if (!user || !user.id) {
            throw new Error('User with that USERNAME not found');
        }

        let userToReturn: any = {
            ...user,
            favourites: user.favourites.map(favourite => ({
                ...favourite,
                categories: favourite.categories.map(category => category.id)
            })),
        }
        /* user.favourites.forEach(fav => {
            fav.categories = fav.categories.map(cat => cat.id);
        }) */

        return userToReturn;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User | undefined> {
        const { email, username, password } = createUserDto;

        if (!email || !username || !password) {
            throw new Error('Missing required fields');
        }

        if (await this.userRepo.findOne({ where: { username } })) {
            throw new Error('User with that USERNAME already exists');
        }

        if (await this.userRepo.findOne({ where: { email } })) {
            throw new Error('User with that EMAIL already exists');
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        const user = new User();
        user.email = email;
        user.username = username;
        user.password = hash;
        user.type = UserTypeEnum.USER;
        user.favourites = [];
        user.dateCreated = new Date();
        user.dateUpdated = new Date();
        return this.userRepo.save(user);
    }

    async toggleFavourite(id: number, userId: number): Promise<User> {
        let user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['favourites', 'favourites.categories']
        });

        if (!user || !user.id) {
            throw new Error('User with that ID not found');
        }
        const isCurrentlyFavourite = !!user.favourites.find(favourite => favourite.id === id);
        let pitanje;
        if (!isCurrentlyFavourite) {
            pitanje = await this.pitRepo.findOne({
                where: { id },
                relations: ['categories']
            });
        }
        const newFavourites = isCurrentlyFavourite
            ? user.favourites.filter(fav => fav.id !== id)
            : [...user.favourites, pitanje];

        user.favourites = newFavourites;

        /* const result = await this.userRepo.update(userId, { favourites: newFavourites });
        return !!result.affected; */
        const result = await this.userRepo.save(user);

        let userToReturn: any = {
            ...result,
            favourites: user.favourites.map(favourite => ({
                ...favourite,
                categories: favourite.categories.map(category => category.id)
            })),
        }

        return userToReturn;
    }
}
