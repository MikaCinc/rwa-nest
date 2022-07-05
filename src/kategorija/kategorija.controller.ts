import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { KategorijaService } from './kategorija.service';
import { CreateKategorijaDto } from './dto/create-kategorija.dto';
import { UpdateKategorijaDto } from './dto/update-kategorija.dto';
import { ServerResponse } from 'src/interfaces';
import { Kategorija } from './entities/kategorija.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserTypeEnum } from 'src/enums';

@Controller('kategorija')
export class KategorijaController {
  constructor(private readonly kategorijaService: KategorijaService) { }

  @Post()
  async create(@Body() createKategorijaDto: CreateKategorijaDto) {
    let response: ServerResponse<Kategorija> = {
      success: false,
      data: null
    };

    try {
      let newKat: Kategorija = await this.kategorijaService.create(createKategorijaDto);
      response.success = true;
      response.data = newKat;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }

  @Get()
  async findAll() {
    let response: ServerResponse<Kategorija[]> = {
      success: false,
      data: null
    };

    try {
      let kategorije: Kategorija[] = await this.kategorijaService.findAll();
      response.success = true;
      response.data = kategorije;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let response: ServerResponse<Kategorija> = {
      success: false,
      data: null
    };

    try {
      let kategorije: Kategorija = await this.kategorijaService.findOne(+id);
      response.success = true;
      response.data = kategorije;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateKategorijaDto: UpdateKategorijaDto) {
    let response: ServerResponse<Kategorija> = {
      success: false,
      data: null
    };

    try {
      let kategorija: Kategorija = await this.kategorijaService.update(+id, updateKategorijaDto);
      response.success = true;
      response.data = kategorija;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    let response: ServerResponse<boolean> = {
      success: false,
      data: null
    };

    try {
      const { user } = req;
      if (!user || user.type !== UserTypeEnum.ADMIN) {
        throw new Error('You are not authorized to perform this action');
      }

      let deleteResult: boolean = await this.kategorijaService.remove(+id);
      response.success = true;
      response.data = deleteResult;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }
}
