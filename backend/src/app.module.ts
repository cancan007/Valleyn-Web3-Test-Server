/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Web3Module } from './modules/web3/web3.module';
import { EthersModule } from 'nestjs-ethers';
import {ConfigModule} from "@nestjs/config"
import { configuration } from './config/configuration';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import * as ormConfig from "../ormconfig"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./src/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: configuration().DB_HOST,
    port: 3306,
    username: configuration().MYSQL_USER,
    password: configuration().MYSQL_PASSWORD,
    database: configuration().MYSQL_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    
  }
  //ormConfig
  ),
    Web3Module,
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
