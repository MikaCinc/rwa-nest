
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        console.log('payload', payload);

        let userFromDB = await this.usersService.findOne(payload.username);
        console.log('userFromDB', userFromDB);

        return {
            id: userFromDB.id,
            username: payload.username,
            email: userFromDB.email,
            dateCreated: userFromDB.dateCreated,
            dateUpdated: userFromDB.dateUpdated
        };
    }
}
