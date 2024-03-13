import { ethers, deployments } from "hardhat";
import { DeployFunction } from 'hardhat-deploy/types';
const deployFn: DeployFunction = async () => {
  const { deploy } = deployments
  const [owner] = await ethers.getSigners();
  const SimpleToken = await deploy("SimpleToken", {
    from: owner.address,
    args: [],
    log: true,
    waitConfirmations: 1,
  })
}
deployFn.tags = ["all", "token"]

export default deployFn;