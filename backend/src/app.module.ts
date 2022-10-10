/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Web3Module } from './web3/web3.module';
import { EthersModule } from 'nestjs-ethers';
import {ConfigModule} from "@nestjs/config"
import { configuration } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./src/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true
  }),
    Web3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
