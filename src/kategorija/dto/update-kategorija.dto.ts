import { PartialType } from '@nestjs/mapped-types';
import { CreateKategorijaDto } from './create-kategorija.dto';

export class UpdateKategorijaDto extends PartialType(CreateKategorijaDto) {}
