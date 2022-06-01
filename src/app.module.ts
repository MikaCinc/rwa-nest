import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PitanjeModule } from './pitanje/pitanje.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm/typeorm.service';
import { getEnvPath } from './common/helpers/env.helper';
import { KategorijaModule } from './kategorija/kategorija.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    PitanjeModule,
    KategorijaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
