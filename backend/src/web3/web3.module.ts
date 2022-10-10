/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EthersModule, GOERLI_NETWORK, KOVAN_NETWORK, RINKEBY_NETWORK } from 'nestjs-ethers';
import { configuration } from 'src/config/configuration';
import { Web3Controller } from './web3.controller';
import { Web3Service } from './web3.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports:[
    ConfigModule.forRoot({
      envFilePath: `src/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true
  })
    ,EthersModule.forRoot(
    {
      network: GOERLI_NETWORK,
      infura: {
        projectId: configuration().PROJECT_ID,
        //projectSecret: configuration().PROJECT_SECRET_KEY
      },
      quorum: 1,  // 2:mainnet, 1:testnet
      waitUntilIsConnected:true,
      useDefaultProvider: false,
    }
  )],
  controllers: [Web3Controller],
  providers: [Web3Service]
})
export class Web3Module {}
