# Deploy own uniswap v2 on arbitrary chian

## Usage

1. Config your network setting at hardhat.config.ts
2. Deploy contract
```shell
yarn install
yarn hardhat deploy --tags all
```
3. Config your uniswap v2 router addres you just deployed
4. Add liquidity    
```shell
yarn hardhat run .\scripts\addLiquidity.ts  
```
