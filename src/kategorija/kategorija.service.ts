import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateKategorijaDto } from './dto/create-kategorija.dto';
import { UpdateKategorijaDto } from './dto/update-kategorija.dto';
import { Kategorija } from './entities/kategorija.entity';

@Injectable()
export class KategorijaService {
  constructor(
    @InjectRepository(Kategorija) private katRepository: Repository<Kategorija>
  ) { }

  create(createKategorijaDto: CreateKategorijaDto) {
    return this.katRepository.save(createKategorijaDto);
  }

  async findAll() {
    let kategorije = await this.katRepository.find();
    return kategorije;
  }

  async findOne(id: number) {
    let kategorija = await this.katRepository.findOneBy({ id });
    if (!kategorija || !kategorija.id) {
      throw new Error('Kategorija with that ID not found');
    }
    return kategorija;
  }

  async update(id: number, updateKategorijaDto: UpdateKategorijaDto) {
    let kategorija = await this.katRepository.findOneBy({ id });
    if (!kategorija || !kategorija.id) {
      throw new Error('Kategorija with that ID not found');
    }
    const { name } = updateKategorijaDto;
    if (!name) {
      throw new Error('Ime kategorije je obavezno');
    }
    kategorija.name = updateKategorijaDto.name;
    kategorija.dateUpdated = new Date();
    let result: Kategorija = await this.katRepository.save(kategorija);
    return result;
    /* return this.katRepository.update(id, { ...updateKategorijaDto, dateUpdated: new Date() }); */
  }

  async remove(id: number) {
    let result: DeleteResult = await this.katRepository.delete(id);
    return !!result.affected;
  }
}
