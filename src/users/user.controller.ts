import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ServerResponse } from 'src/interfaces';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) { }

    // toggle za featured preko ID
    @UseGuards(JwtAuthGuard)
    @Get('toggleFavourite/:id')
    public async toggleFavourite(
        @Request() req,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ServerResponse<User>> {

        let response: ServerResponse<User> = {
            success: false,
            data: null
        };

        try {
            const { user } = req;
            if (!user || !user.id) {
                throw new Error('You are not authorized to perform this action');
            }

            let result: User = await this.userService.toggleFavourite(id, user.id);
            response.success = true;
            response.data = result;
        } catch (err) {
            response.message = err.message;
        }

        return response;
    }
}
