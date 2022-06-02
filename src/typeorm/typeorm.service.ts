import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    @Inject(ConfigService)
    private readonly config: ConfigService;

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        // production
        // return {
        //     type: 'postgres',
        //     host: process.env.DB_HOST,
        //     port: Number.parseInt(process.env.DB_PORT) || 3001,
        //     database: process.env.DB_NAME,
        //     username: process.env.DB_USERNAME,
        //     password: process.env.DB_PASSWORD,
        //     migrations: ['dist/migrations/*.{ts,js}'],
        //     migrationsTableName: 'typeorm_migrations',
        //     logger: 'file',
        //     ssl: { rejectUnauthorized: false },
        //     synchronize: false
        // };

        // // lokalno
        return {
            type: 'postgres',
            host: this.config.get<string>('DB_HOST'),
            port: this.config.get<number>('DB_PORT'),
            database: this.config.get<string>('DB_NAME'),
            username: this.config.get<string>('DB_USERNAME'),
            password: this.config.get<string>('DB_PASSWORD'),
            entities: ['dist/**/*.entity.{ts,js}'],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',


            //! @important SAMO TRUE PRILIKOM TESTIRANJA, NIKAD U PRODUKCIJI
            //! AUTOMATSKI PRAVI NOVU MIGRACIJU PRILIKOM REKOMPAJLIRANJA
            // synchronize: this.config.get<string>('MODE') === 'DEV'
            synchronize: true
        };
    };
};