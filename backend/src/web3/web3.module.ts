/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EthersModule, KOVAN_NETWORK, RINKEBY_NETWORK } from 'nestjs-ethers';
import { configuration } from 'src/config/configuration';
import { Web3Controller } from './web3.controller';
import { Web3Service } from './web3.service';


@Module({
  imports:[EthersModule.forRoot(
    {
      network: KOVAN_NETWORK,
      infura: {
        projectId: configuration().PROJECT_ID
      },
      quorum: 1,  // 2:mainnet, 1:testnet
      useDefaultProvider: true,
    }
  )],
  controllers: [Web3Controller],
  providers: [Web3Service]
})
export class Web3Module {}
