import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KategorijaService } from './kategorija.service';
import { CreateKategorijaDto } from './dto/create-kategorija.dto';
import { UpdateKategorijaDto } from './dto/update-kategorija.dto';

@Controller('kategorija')
export class KategorijaController {
  constructor(private readonly kategorijaService: KategorijaService) {}

  @Post()
  create(@Body() createKategorijaDto: CreateKategorijaDto) {
    return this.kategorijaService.create(createKategorijaDto);
  }

  @Get()
  findAll() {
    return this.kategorijaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kategorijaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKategorijaDto: UpdateKategorijaDto) {
    return this.kategorijaService.update(+id, updateKategorijaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kategorijaService.remove(+id);
  }
}
