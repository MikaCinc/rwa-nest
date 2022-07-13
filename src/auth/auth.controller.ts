import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUser, IUserToken, ServerResponse } from 'src/interfaces';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        let response: ServerResponse<IUserToken> = {
            success: false,
            data: null
        };

        try {
            let loginResult: IUserToken = await this.authService.login(req.user);
            response.success = true;
            response.data = loginResult;
        } catch (err) {
            response.message = err.message || "Problem sa /login rutom";
        }

        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Request() req) {
        let response: ServerResponse<IUser> = {
            success: false,
            data: null
        };

        if (req.user && req.user.id) {
            response.success = true;
            response.data = req.user;
        } else {
            response.message = "Problem sa /me rutom";
        }

        return response;
    }

    @Post('register')
    async createProfile(@Body() createUserDto: CreateUserDto) {
        let response: ServerResponse<IUserToken> = {
            success: false,
            data: null
        };

        try {
            const { username, password, email } = createUserDto;
            if (!username || !password || !email) {
                throw new Error("Nedostaju podaci");
            }
            let registerResult: IUserToken = await this.authService.register(createUserDto);
            response.success = true;
            response.data = registerResult;
        } catch (err) {
            response.message = err.message || "Problem sa /register rutom";
        }

        return response;
    }
}
