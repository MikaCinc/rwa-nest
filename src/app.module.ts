import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PitanjeModule } from './pitanje/pitanje.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm/typeorm.service';
import { getEnvPath } from './common/helpers/env.helper';
import { KategorijaModule } from './kategorija/kategorija.module';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    /* ConfigModule.forRoot({ envFilePath, isGlobal: true }), */
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService, 
      // dataSource receives the configured DataSourceOptions
      // and returns a Promise<DataSource>.
      /* dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      }, */
    }),
    PitanjeModule,
    KategorijaModule,
    AuthModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
