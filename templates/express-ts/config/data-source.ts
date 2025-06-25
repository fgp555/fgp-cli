// src/config/data-source.ts

/* 
npm install typeorm reflect-metadata pg
npm install typeorm reflect-metadata mysql
*/

import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { ENV } from "./envs";
import { UserEntity } from "../user/entities/user.entity";

const entities = [UserEntity];

// Configuración de TypeORM
const typeOrmConfig: DataSourceOptions = {
  type: ENV.DB_TYPE as "mysql" | "postgres",
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_DATABASE,
  synchronize: ENV.SYNCHRONIZE,
  dropSchema: ENV.DROPSCHEMA,
  logging: ["error"],
  entities: entities,
  migrations: ["dist/migrations/*{.ts,.js}"],
  subscribers: [],
  ssl: ENV.DB_SSL, // Configuración SSL opcional
};

// Crear la instancia de DataSource
export const AppDataSource = new DataSource(typeOrmConfig);

// Exporta el tipo para uso global en otras partes de la app
export const conectionSource = new DataSource(typeOrmConfig as DataSourceOptions);
