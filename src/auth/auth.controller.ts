import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUser, IUserToken, ServerResponse } from 'src/interfaces';
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
            response.message = err.message;
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
}
