import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const projectId = process.env.PROJECT_ID;
const privateKey:any = process.env.PRIVATE_KEY;
const moralisId = process.env.AVALANCHE_TESTNET_ID;
const avalancheFujiNodeC = process.env.AVALANCHE_FUJI_NODE_C;
const valleynPrivateKey:any = process.env.VALLEYN_PRIVATEKEY;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    kovan: {
      chainId: 42,
      url: `https://kovan.infura.io/v3/${projectId}`,
      accounts: [valleynPrivateKey]
    },
    avalancheTestnet: {
      chainId: 43113,
      //url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/avalanche/testnet`,
      url: `${avalancheFujiNodeC}`,
      accounts: [valleynPrivateKey]
    },
    goerli:{
      chainId:5,
      url:`https://goerli.infura.io/v3/${projectId}`,
      accounts: [valleynPrivateKey]
    }
  }
};

export default config;
