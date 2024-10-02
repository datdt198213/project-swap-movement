import {expect} from "chai";
import { ethers, Contract, Signer } from "ethers";
import hre from "hardhat";
import { UniswapV2ERC20__factory } from "../typechain-types";
import { describe } from "mocha";

describe("UniswapV2ERC20", function () {
    var uniswapV2ERC20Contract: UniswapV2ERC20__factory;
    var uniswapV2ERC20: Contract;
    var deployer : Signer;

    // This function will be executed before each test suit called 
    this.beforeEach(async function() {
        [deployer] = await hre.ethers.getSigners();
        uniswapV2ERC20Contract = await hre.ethers.getContractFactory("UniswapV2ERC20", deployer)
        uniswapV2ERC20 = await uniswapV2ERC20Contract.deploy();
    })

    describe("approve(address, uint)", async function () {
        it('Approve successfully!', async function () {
            await expect(uniswapV2ERC20.approve(await deployer.getAddress(), 10)).not.reverted
        })
    });
    
});