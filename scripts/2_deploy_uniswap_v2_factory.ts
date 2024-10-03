import hre from 'hardhat'
import { UniswapV2Factory__factory } from '../typechain-types'
import { Signer } from 'ethers';

async function deployUniswapV2Factory() {
    var deployer: Signer;
    var deployerAddress: string;
    const signers: Array<Signer> = await hre.ethers.getSigners();
    deployer = signers[0];
    deployerAddress = await deployer.getAddress();
    const uniswapV2FactoryContract: UniswapV2Factory__factory = await hre.ethers.getContractFactory('UniswapV2Factory', deployer);
    const uniswapV2Factory = await uniswapV2FactoryContract.deploy(deployerAddress);
    
    console.log(`Contract address of UniswapV2Factory: ${await uniswapV2Factory.getAddress()}`);
}

deployUniswapV2Factory();
// 0xFBf5E97c4818c01b7E4c668959E0185d1B5CFF71