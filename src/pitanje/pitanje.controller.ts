import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { PitanjeService } from './pitanje.service';
import { CreatePitanjeDto } from './dto/create-pitanje.dto';
import { UpdatePitanjeDto } from './dto/update-pitanje.dto';
import { IPitanje, ServerResponse } from 'src/interfaces';
import { Pitanje } from './entities/pitanje.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserTypeEnum } from 'src/enums';

@Controller('pitanje')
export class PitanjeController {
  constructor(private readonly pitanjeService: PitanjeService) { }

  @Post()
  async create(@Body() createPitanjeDto: CreatePitanjeDto) {
    let response: ServerResponse<IPitanje> = {
      success: false,
      data: null
    };

    try {
      let newPit: IPitanje = await this.pitanjeService.create(createPitanjeDto);
      response.success = true;
      response.data = newPit;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }

  @Get()
  async findAll() {
    let response: ServerResponse<IPitanje[]> = {
      success: false,
      data: null
    };

    try {
      let pitanja: IPitanje[] = await this.pitanjeService.findAll();
      response.success = true;
      response.data = pitanja;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }

  @Get('/featured')
  async findFeatured() {
    let response: ServerResponse<IPitanje[]> = {
      success: false,
      data: null
    };

    try {
      let pitanja: IPitanje[] = await this.pitanjeService.findFeatured();
      response.success = true;
      response.data = pitanja;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }

  @Get('/kategorija/:id')
  async findAllByCategory(@Param('id') id: string) {
    let response: ServerResponse<Pitanje[]> = {
      success: false,
      data: null
    };

    try {
      let pitanja: Pitanje[] = await this.pitanjeService.findAllByCategory(+id);
      response.success = true;
      response.data = pitanja;
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
      let pitanja: Pitanje = await this.pitanjeService.findOne(+id);
      response.success = true;
      response.data = pitanja;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePitanjeDto: UpdatePitanjeDto) {
    let response: ServerResponse<IPitanje> = {
      success: false,
      data: null
    };

    try {
      let pitanje: IPitanje = await this.pitanjeService.update(+id, updatePitanjeDto);
      response.success = true;
      response.data = pitanje;
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

      let deleteResult: boolean = await this.pitanjeService.remove(+id);
      response.success = true;
      response.data = deleteResult;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }

  // toggle za featured preko ID
  @UseGuards(JwtAuthGuard)
  @Get(':id/toggleFeatured')
  public async toggleFeatured(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServerResponse<Pitanje>> {

    let response: ServerResponse<Pitanje> = {
      success: false,
      data: null
    };

    try {
      let result: Pitanje = await this.pitanjeService.toggleFeatured(id);
      response.success = true;
      response.data = result;
    } catch (err) {
      response.message = err.message;
    }

    return response;
  }
}
