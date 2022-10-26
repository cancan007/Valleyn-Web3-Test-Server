import { BigNumber } from "nestjs-ethers";

/* eslint-disable prettier/prettier */
export class AddUser{
    name:string;
}

export class CreateToken{
    tokenURI:string;
    id:string;
}

export class ChangeOwner{
    ic:string;
    id:string;
}

export class CreateUser{
    userNum: BigNumber;
    userId: string;
    name: string;
    addedTime: BigNumber;
}