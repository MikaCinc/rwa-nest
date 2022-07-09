import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pitanje } from 'src/pitanje/entities/pitanje.entity';
import { PitanjeModule } from 'src/pitanje/pitanje.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Pitanje])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
