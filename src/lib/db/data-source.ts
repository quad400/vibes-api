import { DataSource, DataSourceOptions } from 'typeorm';
import { Config } from '../config';


export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: Config.IS_PRODUCTION && Config.DB_URL,
  host: Config.DB_HOST,
  database: Config.DB_DATABASE,
  port: Config.DB_PORT,
  username: Config.DB_USERNAME,
  password: Config.DB_PASSWORD,
  entities: ['dist/res/**/*.entity{.ts,.js}'],
  migrations: ['dist/lib/db/migrations/*{.ts,.js}'],
  logging: false,
  synchronize: false,
  extra: {
    trustServerCertificate: true,
  },
  ssl: Config.IS_PRODUCTION,
};


const dataSource = new DataSource(dataSourceOptions);

export default dataSource;