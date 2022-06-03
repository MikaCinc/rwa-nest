import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PitanjeService } from './pitanje.service';
import { CreatePitanjeDto } from './dto/create-pitanje.dto';
import { UpdatePitanjeDto } from './dto/update-pitanje.dto';
import { ServerResponse } from 'src/interfaces';
import { Pitanje } from './entities/pitanje.entity';

@Controller('pitanje')
export class PitanjeController {
  constructor(private readonly pitanjeService: PitanjeService) {}

  @Post()
  async create(@Body() createPitanjeDto: CreatePitanjeDto) {
    let response: ServerResponse<Pitanje> = {
      success: false,
      data: null
    };

    try {
      let newPit: Pitanje = await this.pitanjeService.create(createPitanjeDto);
      response.success = true;
      response.data = newPit;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }

  @Get()
  async findAll() {
    let response: ServerResponse<Pitanje[]> = {
      success: false,
      data: null
    };

    try {
      let kategorije: Pitanje[] = await this.pitanjeService.findAll();
      response.success = true;
      response.data = kategorije;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let response: ServerResponse<Pitanje> = {
      success: false,
      data: null
    };

    try {
      let kategorije: Pitanje = await this.pitanjeService.findOne(+id);
      response.success = true;
      response.data = kategorije;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePitanjeDto: UpdatePitanjeDto) {
    let response: ServerResponse<Pitanje> = {
      success: false,
        data: null
      };
  
      try {
        let pitanje: Pitanje = await this.pitanjeService.update(+id, updatePitanjeDto);
        response.success = true;
        response.data = pitanje;
      } catch (err) {
        response.message = err.message;
      }
  
      return response;  
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response: ServerResponse<boolean> = {
      success: false,
      data: null
    };

    try {
      let deleteResult: boolean = await this.pitanjeService.remove(+id);
      response.success = true;
      response.data = deleteResult;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }
}
