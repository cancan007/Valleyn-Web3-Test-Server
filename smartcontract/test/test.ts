import { expect } from "chai";
import { ethers } from "hardhat";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { ID } from "../typechain-types";
import { Provider } from "@ethersproject/abstract-provider";
import { Signer } from "ethers";

describe("ID", ()=>{
    async function deployIdFixture() {
        const secretNum = 483;
    
        const ID = await ethers.getContractFactory("ID");
        const id = await ID.deploy(secretNum);
        await id.deployed();
        const [owner, user1, user2] = await ethers.getSigners();
    
        return { id, owner, user1, user2};
      }

    describe("createUserInfo", ()=>{

        it("try to create user info", async()=>{
            const name = "Tarou"
            const {id, owner, user1, user2} = await loadFixture(deployIdFixture);
            let tx = await id.createUserInfo(name);
            let event = await tx.wait();
            if(event.events){
                console.log(event.events[0].args);
            }
            await expect(id.createUserInfo(name))
          .to.emit(id, "CreateUserInfo")
          .withArgs(anyValue, anyValue, anyValue,name, anyValue); // We accept any value as `when` arg
        })
    })

    describe("fetchUserInfos", ()=>{
        let id:ID;
        let user1: string | Signer | Provider;
        let name:string, name2:string;
        beforeEach(async()=>{
            name = "Tarou"
            let args = await loadFixture(deployIdFixture);
            id = args.id;
            user1 = args.user1;
            let tx = await id.createUserInfo(name);
            let event = await tx.wait();
            name2 = "Satou"
            tx = await id.createUserInfo(name2);
            event = await tx.wait();
        })

        it("try to fetch userinfo", async()=>{
            const userInfos = await id.fetchAllUserInfo()
            console.log(userInfos);
            expect(userInfos[0].name).to.equal(name);
            expect(userInfos[1].name).to.equal(name2);

            expect(id.connect(user1).fetchAllUserInfo()).to.be.revertedWith("You aren't the owner")

            const user1Info = await id.fetchUserInfoById(userInfos[0].userId);
            expect(user1Info.name).to.equal(name);
            const user2Info = await id.fetchUserInfoByIc(userInfos[1].userIc);
            expect(user2Info.name).to.equal(name2);
        })
    })
})