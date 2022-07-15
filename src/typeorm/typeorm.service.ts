import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    @Inject(ConfigService)
    private readonly config: ConfigService;

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        // lokalno
        // return {
        //     type: 'postgres',
        //     host: this.config.get<string>('DB_HOST'),
        //     port: this.config.get<number>('DB_PORT'),
        //     database: this.config.get<string>('DB_NAME'),
        //     username: this.config.get<string>('DB_USERNAME'),
        //     password: this.config.get<string>('DB_PASSWORD'),
        //     entities: ['dist/**/*.entity.{ts,js}'],
        //     migrations: ['dist/migrations/*.{ts,js}'],
        //     migrationsTableName: 'typeorm_migrations',
        //     logger: 'file',

        //     // Automatski pravi novu migraciju prilikom rekompajliranja
        //     synchronize: true
        // };

        // docker
        return {
            type: 'postgres',
            host: this.config.get<string>('DOCKER_DB_HOST'),
            port: this.config.get<number>('DOCKER_DB_PORT'),
            database: this.config.get<string>('DOCKER_DB_NAME'),
            username: this.config.get<string>('DOCKER_DB_USERNAME'),
            password: this.config.get<string>('DOCKER_DB_PASSWORD'),
            entities: ['dist/**/*.entity.{ts,js}'],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            synchronize: true
        };
    };
};