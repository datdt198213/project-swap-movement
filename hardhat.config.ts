import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    movement: {
      url: "https://mevm.devnet.imola.movementlabs.xyz",
      accounts: ["f70920bc474b73aa90bff0d7ac295cd840b72375aeea12b20ff88460dac80f53"],
      chainId: 30732
    },
    arbitrum_l2: {
        url: 'https://sepolia-rollup.arbitrum.io/rpc',
        accounts: ["f70920bc474b73aa90bff0d7ac295cd840b72375aeea12b20ff88460dac80f53"],
      },
  },
};

export default config;
