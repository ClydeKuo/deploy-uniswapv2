import factoryArtifact from "@uniswap/v2-core/build/UniswapV2Factory.json";
import routerArtifact from "@uniswap/v2-periphery/build/UniswapV2Router02.json";
import wethArtifact from "@uniswap/v2-periphery/build/WETH9.json"
import hre, { ethers, deployments } from "hardhat";
import { DeployFunction } from 'hardhat-deploy/types';
const WETH_CONTRACT_ADDRESS: { [key: string]: string } = {
  "mainnet": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "goerli": "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  "sepolia": "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"
}
let wethAddress = WETH_CONTRACT_ADDRESS[hre.network.name]
const deployFn: DeployFunction = async () => {
  const [owner] = await ethers.getSigners();
  const { log } = deployments;
  if (!wethAddress) {
    const WETH9 = new ethers.ContractFactory(
      wethArtifact.abi,
      wethArtifact.bytecode,
      owner
    );
    const weth9 = await WETH9.deploy();
    wethAddress = weth9.target as string
    await weth9.waitForDeployment()
  }

  const Factory = new ethers.ContractFactory(
    factoryArtifact.abi,
    factoryArtifact.bytecode,
    owner
  );
  const factory = await Factory.deploy(owner.address);
  const Router = new ethers.ContractFactory(
    routerArtifact.abi,
    routerArtifact.bytecode,
    owner
  );
  const factoryAddress = factory.target

  const router = await Router.deploy(factoryAddress, wethAddress);
  const routerAddress = router.target;
  log(`factory: ${factoryAddress},router: ${routerAddress}, weth: ${wethAddress}`)
  await Promise.all([factory.waitForDeployment, router.waitForDeployment,])
}

deployFn.tags = ["all", "uniswap", "v2"]

export default deployFn;