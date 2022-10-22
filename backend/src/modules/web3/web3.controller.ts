/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddUser, ChangeOwner, CreateToken } from './dto/web3.dto';
import { Item, NftTokenUri, User } from './entity/web3.entity';
import { Web3Service } from './web3.service';

@Controller('web3')
export class Web3Controller {
    constructor(private web3Service:Web3Service){}


    @Get("users")
    async fetchAllUserInfo():Promise<Array<User>>{
        const signer = await this.web3Service.getSigner();
        const contract = await this.web3Service.getContract();
        let users = await contract.connect(signer).fetchAllUsers();
        users = users.map((user:any)=>{
            return({
                userNum:user.userNum,
                userId:user.userId,
                name:user.name
            })
        }) 
        return users;
    }

    @Get("users/:id")
    async fetchUserInfoById(@Param("id") id:string):Promise<User>{
        const contract = await this.web3Service.getContract();
        let user = await contract.fetchUserById(id);
        user = {userNum:user.userNum,
            userId:user.userId,
            name:user.name}
        return user;
    }

    @Post("users")
    async addUser(@Body() body:AddUser):Promise<any>{
        const signer = await this.web3Service.getSigner();
        const contract = await this.web3Service.getContract();
        const tx = await contract.connect(signer).addUser(body.name);
        const event = await tx.wait();
        return event.events[0].args;
    }

    @Get("items")
    async fetchAllItems():Promise<Array<Item & NftTokenUri & User>>{
        const signer = await this.web3Service.getSigner();
        const contract = await this.web3Service.getContract();
        
        const items = await contract.connect(signer).fetchAllItems();
        const itemsOrganized = items.map(async(item:Item)=>{
            const {tokenId, ic, ownerId, txTime} = item;
            const tokenURI = await contract.tokenURI(tokenId)
            const {name} = await contract.fetchUserById(ownerId);
            return {tokenId, ic, ownerId, txTime, tokenURI, name}
        })
        const responses = await Promise.all(itemsOrganized);
        return responses;
    }

    @Get("items/:id")
    async fetchItemsById(@Param("id") id:string):Promise<Array<Item & NftTokenUri & User>>{
        const contract = await this.web3Service.getContract();
        const items = await contract.fetchItemsById(id);
        const response = await Promise.all(items.map(async(item:Item)=>{
            const {tokenId, ic, ownerId, txTime} = item;
            const tokenURI = await contract.tokenURI(tokenId)
            return {tokenId, ic, ownerId, txTime, tokenURI}
        }))
        return response
    }

    @Get("tx-history/:ic")
    async fetchEventsByIc(@Param("ic") ic:string){
        const provider = this.web3Service.getProvider();
        const contract = await this.web3Service.getContract();
        const block = await provider.getBlockNumber();
        const filters = contract.filters.Transaction(null,ic);
        const events = await contract.queryFilter(filters, 0, block);
        const argsArray = events.map((event:any,i:number)=>{
            const {ic,currentOwnerId, txTime} = event.args
            return {ic,currentOwnerId, txTime}
        })
        return argsArray
    }

    @Post("create-token")
    async createToken(@Body() body:CreateToken):Promise<any>{
        const signer = await this.web3Service.getSigner();
        const contract = await this.web3Service.getContract();
        const tx = await contract.connect(signer).createToken(body.tokenURI, body.id);
        const event = await tx.wait();
        return event.events[2].args;
    }

    @Post("items/change")
    async changeOwner(@Body() body:ChangeOwner):Promise<any>{
        const signer = await this.web3Service.getSigner();
        const contract = await this.web3Service.getContract();
        const tx = await contract.connect(signer).changeOwner(body.ic, body.id);
        const event = await tx.wait();
        return event.events[0].args;
    }
}
