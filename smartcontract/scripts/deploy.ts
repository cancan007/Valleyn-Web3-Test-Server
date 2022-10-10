import { ethers } from "hardhat";
import fs from "fs";
import fse from "fs-extra";
import mapJson from "../map.json";

async function main() {
  const secretNum = 385;
  const ID = await ethers.getContractFactory("ID");
  const id = await ID.deploy(secretNum);
  await id.deployed();

  const {chainId} = await ethers.provider.getNetwork();

  //let mapJson:any = fs.readFileSync("./map.json");
  
  const chainKey = chainId as keyof typeof mapJson
  //mapJson = JSON.parse(mapJson);
  if(!mapJson[chainKey]){
    mapJson[chainKey] = {
      "ID":[]
    }
  }
  console.log(mapJson)
  mapJson[chainKey]["ID"].push(id.address);
  let mapJsonSt = JSON.stringify(mapJson);

  fs.writeFileSync('./map.json', mapJsonSt)
  console.log("Updated map.json");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
