import { Injectable } from '@nestjs/common';
import { CreateKategorijaDto } from './dto/create-kategorija.dto';
import { UpdateKategorijaDto } from './dto/update-kategorija.dto';

@Injectable()
export class KategorijaService {
  create(createKategorijaDto: CreateKategorijaDto) {
    return 'This action adds a new kategorija';
  }

  findAll() {
    return `This action returns all kategorija`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kategorija`;
  }

  update(id: number, updateKategorijaDto: UpdateKategorijaDto) {
    return `This action updates a #${id} kategorija`;
  }

  remove(id: number) {
    return `This action removes a #${id} kategorija`;
  }
}
