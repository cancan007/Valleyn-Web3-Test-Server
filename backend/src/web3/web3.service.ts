/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectEthersProvider, BaseProvider, EthersSigner, Wallet, EthersContract } from 'nestjs-ethers';
import { configuration } from 'src/config/configuration';
import mapJson from "../config/map.json";
import ID from "../config/artifacts/contracts/ID.sol/ID.json";

@Injectable()
export class Web3Service {
    constructor(
        @InjectEthersProvider()
        private readonly ethersProvider: BaseProvider,
        private readonly signer: EthersSigner,  // already include BaseProvider
        private readonly ethersContract: EthersContract,  // already include BaseProvider
      ) {}

    async getSigner():Promise<Wallet>{
        const signer= this.signer.createWallet(configuration().PRIVATEKEY);
        return signer;
    }

    async getContract(){
        const {chainId} = await this.ethersProvider.getNetwork()
        const chainKey = chainId as unknown as keyof typeof mapJson
        const contract = this.ethersContract.create(mapJson[chainKey]["ID"].slice(-1)[0], ID.abi);
        return contract;
    }
};
