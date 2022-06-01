import { Injectable } from '@nestjs/common';
import { CreatePitanjeDto } from './dto/create-pitanje.dto';
import { UpdatePitanjeDto } from './dto/update-pitanje.dto';

@Injectable()
export class PitanjeService {
  create(createPitanjeDto: CreatePitanjeDto) {
    return 'This action adds a new pitanje';
  }

  findAll() {
    return `This action returns all pitanje`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pitanje`;
  }

  update(id: number, updatePitanjeDto: UpdatePitanjeDto) {
    return `This action updates a #${id} pitanje`;
  }

  remove(id: number) {
    return `This action removes a #${id} pitanje`;
  }
}
