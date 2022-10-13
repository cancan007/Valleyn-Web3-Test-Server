import { ethers } from "hardhat";
import fs from "fs";
import fse from "fs-extra";
import mapJson from "../map.json";

async function main() {
  const secretNum = 385;
  const ID = await ethers.getContractFactory("ID");
  const id = await ID.deploy(secretNum);
  await id.deployed();
  const VTAdmin = await ethers.getContractFactory("VTAdmin");
  const vtAdmin = await VTAdmin.deploy(secretNum);
  await vtAdmin.deployed();

  const {chainId} = await ethers.provider.getNetwork();
  
  const chainKey = chainId as keyof typeof mapJson
  //mapJson = JSON.parse(mapJson);
  if(!mapJson[chainKey]){
    mapJson[chainKey] = {
      "ID":[],
      "VTAdmin":[]
    }
  }else if(!mapJson[chainKey]["VTAdmin"]){
    mapJson[chainKey]["VTAdmin"] = [];
  }
  console.log(mapJson)
  mapJson[chainKey]["ID"].push(id.address);
  mapJson[chainKey]["VTAdmin"].push(vtAdmin.address);
  let mapJsonSt = JSON.stringify(mapJson);

  fs.writeFileSync('./map.json', mapJsonSt)
  fs.writeFileSync('../backend/src/config/map.json', mapJsonSt);
  console.log("Updated map.json");

  if (fs.existsSync("../backend/src/config/artifacts")) {
    await fse.remove("../backend/src/config/artifacts")
      .then(() => console.log("deleted ../backend/src/config/artifacts"))
      .catch((err) => console.error(err))
    fse.copySync("./artifacts", "../backend/src/config/artifacts")
    console.log("Updated ../backend/src/config/artifacts")
    return
  }

  fse.copySync("./artifacts", "../backend/src/config/artifacts")
  console.log("Created ../backend/src/config/artifacts")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
