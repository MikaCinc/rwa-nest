import { PartialType } from '@nestjs/mapped-types';
import { CreatePitanjeDto } from './create-pitanje.dto';

export class UpdatePitanjeDto extends PartialType(CreatePitanjeDto) {}
