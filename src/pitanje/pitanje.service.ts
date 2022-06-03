import { Injectable } from '@nestjs/common';
import { CreatePitanjeDto } from './dto/create-pitanje.dto';
import { UpdatePitanjeDto } from './dto/update-pitanje.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Pitanje } from './entities/pitanje.entity';

@Injectable()
export class PitanjeService {
  constructor(
    @InjectRepository(Pitanje) private pitRepository: Repository<Pitanje>
  ) { }

  create(createPitanjeDto: CreatePitanjeDto) {
    return this.pitRepository.save(createPitanjeDto);
  }

  async findAll() {
    let kategorije = await this.pitRepository.find();
    return kategorije;
  }

  async findOne(id: number) {
    let pitanje = await this.pitRepository.findOneBy({ id });
    if (!pitanje || !pitanje.id) {
      throw new Error('Pitanje with that ID not found');
    }
    return pitanje;
  }

  async update(id: number, updatePitanjeDto: UpdatePitanjeDto) {
    let pitanje = await this.pitRepository.findOneBy({ id });
    if (!pitanje || !pitanje.id) {
      throw new Error('Pitanje with that ID not found');
    }
    const { text, isCorrect } = updatePitanjeDto;
    console.log(updatePitanjeDto);

    if (!text) {
      throw new Error('Ime kategorije je obavezno');
    }
    pitanje.text = text;
    pitanje.isCorrect = isCorrect;
    pitanje.dateUpdated = new Date();
    let result: Pitanje = await this.pitRepository.save(pitanje);
    return result;
    /* return this.pitRepository.update(id, { ...updatePitanjeDto, dateUpdated: new Date() }); */
  }

  async remove(id: number) {
    let result: DeleteResult = await this.pitRepository.delete(id);
    return !!result.affected;
  }
}
