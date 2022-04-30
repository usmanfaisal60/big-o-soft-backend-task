import { ConfigService } from "@nestjs/config";
import pg from "pg";
import { Sequelize } from 'sequelize-typescript';
import { Users } from "src/common/database/models/users.model";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const configService = new ConfigService();
            const sequelize = new Sequelize({
                dialect: "postgres",
                host: configService.get("DB_HOST"),
                username: configService.get("DB_USERNAME"),
                password: configService.get("DB_PASSWORD"),
                database: configService.get("DB_DATABASE"),
                logging: !!Number(configService.get("DB_LOGGING")),
                dialectModule: pg,
            });
            sequelize.addModels([
                Users,
            ]);
            if (!!Number(configService.get("SYNC_DATABASE"))) await sequelize.sync({ alter: true, force: false });
            return sequelize;
        },
    },
];