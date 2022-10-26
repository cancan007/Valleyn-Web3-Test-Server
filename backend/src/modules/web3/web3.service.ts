/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectEthersProvider, BaseProvider, EthersSigner, Wallet, EthersContract, InjectSignerProvider, InjectContractProvider, Contract } from 'nestjs-ethers';
import { configuration } from 'src/config/configuration';
import * as mapJson from "../../config/map.json";
import * as ID from "../../config/artifacts/contracts/ID.sol/ID.json";
import * as VTAdmin from "../../config/artifacts/contracts/VTAdmin.sol/VTAdmin.json";
import { CreateUser } from './dto/web3.dto';

@Injectable()
export class Web3Service {
    constructor(
        @InjectEthersProvider()
        private readonly ethersProvider: BaseProvider,
        @InjectSignerProvider()
        private readonly ethersSigner: EthersSigner,  // already include BaseProvider
        @InjectContractProvider()
        private readonly ethersContract: EthersContract,  // already include BaseProvider
      ) {}

    getProvider():BaseProvider{
        const provider = this.ethersProvider;
        return provider;
    }

    getSigner():Wallet{
        //console.log(this.ethersProvider)
        const signer= this.ethersSigner.createWallet(configuration().PRIVATEKEY);
        //console.log(signer)
        return signer;
    }

    async getContract():Promise<Contract>{
        const {chainId} = await this.ethersProvider.getNetwork()
        const chainKey = chainId as unknown as keyof typeof mapJson
        const contract = this.ethersContract.create(mapJson[chainKey]["VTAdmin"].slice(-1)[0], VTAdmin.abi);
        return contract;
    }

    async createUser(username:string):Promise<CreateUser>{
        const signer = this.getSigner();
        const contract = await this.getContract();
        const tx = await contract.connect(signer).addUser(username);
        const event = await tx.wait();
        const {userNum, userId, name, addedTime} = event.events[0].args;
        return {userNum, userId, name, addedTime};
    }
};
