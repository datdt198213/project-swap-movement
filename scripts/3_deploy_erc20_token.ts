import hre from 'hardhat'
import { TokenERC20__factory } from '../typechain-types'
import { Signer } from 'ethers';

async function deployTokenERC20() {
    var deployer: Signer;
    var deployerAddress: string;
    const signers: Array<Signer> = await hre.ethers.getSigners();
    deployer = signers[0];
    deployerAddress = await deployer.getAddress();
    const tokenERC20Contract: TokenERC20__factory = await hre.ethers.getContractFactory('TokenERC20', deployer);
    const token1 = await tokenERC20Contract.deploy("Token 1", "TK1", 18);
    const token2 = await tokenERC20Contract.deploy("Token 2", "TK2", 18);
    
    console.log(`Contract address of Token1: ${await token1.getAddress()}`);
    console.log(`Contract address of Token2: ${await token2.getAddress()}`);
}

deployTokenERC20();
// Token 1: 0xEb733864343c6Dd17eCAC88Fa54e2e198224F9b8
// Token 2: 0x95855D7689710Db087A6Da60B976D205CCD36cb9