
import { DataSource } from "typeorm";

import * as dotenv from 'dotenv';

// Memuat variabel lingkungan dari .env
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../entities/*.{js,ts}'],
    migrations: [__dirname + '/../migrations/*.{js,ts}'],
    synchronize: false
})