import { Module } from '@nestjs/common';
import { PitanjeService } from './pitanje.service';
import { PitanjeController } from './pitanje.controller';

@Module({
  controllers: [PitanjeController],
  providers: [PitanjeService]
})
export class PitanjeModule {}
