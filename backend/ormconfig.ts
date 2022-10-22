import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const options =
  //: MysqlConnectionOptions
  {
    type: 'mysql',
    host: 'testdb',
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'develop', //dockerのdb名
    entities: ['dist/src/**/*.entity.js'],
    migrations: ['dist/migration/**/*.migration.js'],
    synchronize: true,
    cli: {
      migrationsDir: 'migration',
    },
  };

module.exports = options;
