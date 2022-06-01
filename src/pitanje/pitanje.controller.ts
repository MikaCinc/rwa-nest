import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PitanjeService } from './pitanje.service';
import { CreatePitanjeDto } from './dto/create-pitanje.dto';
import { UpdatePitanjeDto } from './dto/update-pitanje.dto';

@Controller('pitanje')
export class PitanjeController {
  constructor(private readonly pitanjeService: PitanjeService) {}

  @Post()
  create(@Body() createPitanjeDto: CreatePitanjeDto) {
    return this.pitanjeService.create(createPitanjeDto);
  }

  @Get()
  findAll() {
    return this.pitanjeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pitanjeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePitanjeDto: UpdatePitanjeDto) {
    return this.pitanjeService.update(+id, updatePitanjeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pitanjeService.remove(+id);
  }
}
