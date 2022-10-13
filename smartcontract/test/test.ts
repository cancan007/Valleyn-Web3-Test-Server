import { expect } from "chai";
import { ethers } from "hardhat";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { ID } from "../typechain-types";
import { Provider } from "@ethersproject/abstract-provider";
import { Signer } from "ethers";

describe("VTAdmin", ()=>{
    async function deployVTAdmin(){
        const secretNum = 8473;

        const VTAdmin = await ethers.getContractFactory("VTAdmin");
        const vtAdmin = await VTAdmin.deploy(secretNum);
        await vtAdmin.deployed();
        const [owner, user1] = await ethers.getSigners();
        return {vtAdmin, owner, user1};
    }

    async function addUsers(){
        const name1 = "Rosetta Osborn";
        const name2 = "Michell Pumpkin"; 
        const {vtAdmin, user1} = await deployVTAdmin();
        let tx = await vtAdmin.addUser(name1);
        let event:any = await tx.wait();
        let id1 = event.events[0].args[1];
        tx = await vtAdmin.addUser(name2);
        event = await tx.wait();
        let id2 = event.events[0].args[1];
        return {vtAdmin,user1,name1, name2,id1, id2};
    }

    async function createTokens(){
        const tokenURI = "https://example.com/image2";
        const {vtAdmin,user1,name1,name2, id1, id2} = await addUsers();
        let tx = await vtAdmin.createToken(tokenURI, id1);
        let event:any = await tx.wait();
        const ic1 = event.events[2].args[1];
        tx = await vtAdmin.createToken(tokenURI, id2);
        event = await tx.wait();
        const ic2 = event.events[2].args[1];
        return {vtAdmin,user1,name1,name2, id1, id2, ic1, ic2};
    }

    describe("try to add user", ()=>{
        const name = "Jenny Rogan";
        it("Add user", async()=>{
            const {vtAdmin} = await deployVTAdmin();
            let tx = await vtAdmin.addUser(name);
            let event:any = await tx.wait();
            console.log(event.events[0].args);
            expect(event.events[0].args[2]).to.be.equal(name);
        })

        it("revert when executed by non owner", async()=>{
            const {vtAdmin, user1} = await deployVTAdmin();
            await expect(vtAdmin.connect(user1).addUser(name)).to.be.revertedWith('Ownable: caller is not the owner');
        })
    })

    describe("createToken", ()=>{
        const tokenURI = "https://example.com/image";
        const fakeId = '0x324c6b6a3305f1e26e6475b16519ea27170d5cd375a18af5d14ed671852ea9de';
        it("create Token", async()=>{
            const {vtAdmin,user1,name1,name2, id1, id2} = await addUsers();
            let tx = await vtAdmin.createToken(tokenURI, id1);
            let event:any = await tx.wait();
            console.log(event.events[2].args);
            expect(event.events[2].args[2]).to.be.equal(id1);
        })

        it("revert when executed by non owner", async()=>{
            const {vtAdmin,user1,name1,name2, id1, id2} = await addUsers();
            await expect(vtAdmin.connect(user1).createToken(tokenURI, id1)).to.be.revertedWith('Ownable: caller is not the owner');
        })

        it("revert when use invalid id", async()=>{
            const {vtAdmin,user1,name1,name2, id1, id2} = await addUsers();
            await expect(vtAdmin.createToken(tokenURI, fakeId)).to.be.revertedWith("This userID is invalid");
        })
    })

    describe('Chanege owner',()=>{

        it("changeOwner", async()=>{
            const {vtAdmin,user1,name1,name2, id1, id2, ic1, ic2} = await createTokens();
            const itemsOfId1 = await vtAdmin.fetchItemsById(id1);
            console.log(itemsOfId1);
            expect(itemsOfId1[0].ic).to.be.equal(ic1);
            const ic = itemsOfId1[0].ownerId;
            let tx = await vtAdmin.changeOwner(ic1, id2);
            let event:any = await tx.wait();
            console.log(event.events[0].args);
            expect(event.events[0].args[2]).to.be.equal(id2);
            const itemsOfId2  = await vtAdmin.fetchItemsById(id2);
            expect(itemsOfId2[0].ic).to.be.equal(ic1);
        })

        it("revert when executed by non owner", async()=>{
            const {vtAdmin,user1,name1,name2, id1, id2, ic1, ic2} = await createTokens();
            await expect(vtAdmin.connect(user1).changeOwner(ic1,id2)).to.be.revertedWith('Ownable: caller is not the owner')
        })

        it("revert when used invalid userID", async()=>{
            const fakeId = '0x324c6b6a3305f1e26e6475b16519ea27170d5cd375a18af5d14ed671852ea9de';
            const {vtAdmin,user1,name1,name2, id1, id2, ic1, ic2} = await createTokens();
            await expect(vtAdmin.changeOwner(ic1, fakeId)).to.be.revertedWith("This userID is invalid");
        })

        it("reverted when used invalid IC", async()=>{
            const fakeIC = '0x324c6b6a3305f1e26e6475b16519ea27170d5cd375a18af5d14ed671852ea9de';
            const {vtAdmin,user1,name1,name2, id1, id2, ic1, ic2} = await createTokens();
            await expect(vtAdmin.changeOwner(fakeIC, id2)).to.be.revertedWith("This IC is invalid");
        })
    })

    describe("fetch items and users", ()=>{
        it("fetch all users", async()=>{
            const {vtAdmin} = await addUsers();
            const users = await vtAdmin.fetchAllUsers();
            expect(users.length).to.be.equal(2);
        })
        it("fetch all items", async()=>{
            const {vtAdmin} = await createTokens();
            const items = await vtAdmin.fetchAllItems();
            expect(items.length).to.be.equal(2);
        })
        it("fetch item by ic", async()=>{
            const {vtAdmin, ic1} = await createTokens();
            const item = await vtAdmin.fetchItemByIC(ic1);
            expect(item.ic).to.be.equal(ic1);
        })
        it("revert when called by non owner", async()=>{
            const {vtAdmin, user1,ic1} = await createTokens();
            await expect(vtAdmin.connect(user1).fetchAllItems()).to.be.revertedWith('Ownable: caller is not the owner');
            await expect(vtAdmin.connect(user1).fetchAllItems()).to.be.revertedWith('Ownable: caller is not the owner');
        })
    })
})

/*
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
*/