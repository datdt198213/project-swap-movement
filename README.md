# Sample Hardhat Project

1. Install dependences of nodejs project
```shell
npm install
```

2. Compile contract code before run test
```shell
npx hardhat compile
```

3. Run test <br>
For example: If test a file UniswapV2ERC20.ts running below command
```shell
npx hardhat test test/UniswapV2ERC20.ts
```

4. Deploy token
Choose deploy token on the test net arbitrum_l2 or movement (config in file hardhat.config.ts) <br>
For example using arbitrum_l2 network and deploy TokenERC20 by file 3_deploy_erc20_token.ts
```shell
npx hardhat run scripts/3_deploy_erc20_token.ts --network arbitrum_l2
```