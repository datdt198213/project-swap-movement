import hre from 'hardhat'
import { UniswapV2Factory__factory } from '../typechain-types'
import { Signer, Interface } from 'ethers';

async function createPair() {
    var deployer: Signer;
    var deployerAddress: string;
    const contractAddress = "0xFBf5E97c4818c01b7E4c668959E0185d1B5CFF71";
    const signers: Array<Signer> = await hre.ethers.getSigners();
    deployer = signers[0];
    deployerAddress = await deployer.getAddress();
    const uniswapV2FactoryContract: UniswapV2Factory__factory = await hre.ethers.getContractFactory('UniswapV2Factory', deployer);
    const uniswapV2Factory = uniswapV2FactoryContract.attach(contractAddress);

    const token1 = "0xEb733864343c6Dd17eCAC88Fa54e2e198224F9b8"
    const token2 = "0x95855D7689710Db087A6Da60B976D205CCD36cb9"
    const tx = await uniswapV2Factory.createPair(token1, token2);
    const receipt = await tx.wait();
    
    const iface = new Interface(['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'])
    for (const log of receipt.logs) {
        const mLog = iface.parseLog(log);
        if (mLog && mLog.name === 'PairCreated') {
            const {token0, token1, pair, allPair} = mLog.args;
            console.log(pair);
        }
    }
    console.log(tx.hash);
}

createPair()
// Pair 0xd031e6533a4ece06645582ab3a8353dd8c14a739