import { Module } from '@nestjs/common';
import { PitanjeService } from './pitanje.service';
import { PitanjeController } from './pitanje.controller';
import { Pitanje } from './entities/pitanje.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pitanje])],
  controllers: [PitanjeController],
  providers: [PitanjeService]
})
export class PitanjeModule { }
