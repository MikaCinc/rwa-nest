import { Module } from '@nestjs/common';
import { KategorijaService } from './kategorija.service';
import { KategorijaController } from './kategorija.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kategorija } from './entities/kategorija.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kategorija])],
  controllers: [KategorijaController],
  providers: [KategorijaService]
})
export class KategorijaModule { }
