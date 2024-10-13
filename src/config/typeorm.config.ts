import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";

config();

export function TypeOrmConfig(): TypeOrmModuleOptions {
  const { DB_USERNAME, DB_PORT, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

  return {
    type: "mysql",
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    autoLoadEntities: false,
    synchronize: true,
    entities: [
      "dist/**/**/**/*.entity{.js,.ts}",
      "dist/**/**/*.entity{.js,.ts}",
    ],
  };
}
