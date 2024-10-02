import hre from 'hardhat'
import {expect} from 'chai'
import { UniswapV2Factory__factory } from '../typechain-types';
import { Contract, Signer } from 'ethers';

describe("UniswapV2Factory", function () {
  var uniswapV2FactoryContract: UniswapV2Factory__factory;
  var uniswapV2Factory: Contract;
  var deployer : Signer;
  
  // This function will be executed before each test suit called 
  this.beforeEach(async function() {
      [deployer] = await hre.ethers.getSigners();
      uniswapV2FactoryContract = await hre.ethers.getContractFactory("UniswapV2Factory", deployer)
      uniswapV2Factory = await uniswapV2FactoryContract.deploy(await deployer.getAddress());
  })

  describe("setFeeTo(address)", async function () {
      it('Set feeTo successfully!', async function () {
          await expect(uniswapV2Factory.setFeeTo(await deployer.getAddress())).not.reverted
      })
  });
  
});