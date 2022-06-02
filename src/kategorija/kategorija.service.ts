import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findAll() {
    return this.katRepository.find();
  }

  findOne(id: number) {
    return this.katRepository.findOneBy({ id });
  }

  update(id: number, updateKategorijaDto: UpdateKategorijaDto) {
    return this.katRepository.update(id, updateKategorijaDto);
  }

  remove(id: number) {
    return this.katRepository.delete(id);
  }
}
