import hre from 'hardhat'

async function deployLiquidityValueCalculator() {
    const liquidity = await hre.ethers.getContractFactory('LiquidityValueCalculator');
    const signer = await hre.ethers.getSigners();
    const liquidityContract = await hre.ethers.deployContract(liquidity, signer);
}