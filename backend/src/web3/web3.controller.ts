/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserInfo } from './dto/web3.dto';
import { UserInfo } from './entity/web3.entity';
import { Web3Service } from './web3.service';

@Controller('web3')
export class Web3Controller {
    constructor(private web3Service:Web3Service){}


    @Get()
    async fetchAllUserInfo():Promise<Array<UserInfo>>{
        const signer = await this.web3Service.getSigner();
        const contract = await this.web3Service.getContract();
        const userInfos = await contract.connect(signer).fetchAllUserInfo();
        console.log(userInfos);
        return userInfos;
    }

    @Get(":id")
    async fetchUserInfoById(@Param("id") id:string):Promise<UserInfo>{
        const contract = await this.web3Service.getContract();
        const userInfo = await contract.fetchUserInfoById(id);
        return userInfo;
    }

    @Post()
    async createUserInfo(@Body() body:CreateUserInfo):Promise<any>{
        const signer = await this.web3Service.getSigner();
        const contract = await this.web3Service.getContract();
        const tx = await contract.connect(signer).createUserInfo(body.name);
        const event = await tx.wait();
        return event;
    }
}
