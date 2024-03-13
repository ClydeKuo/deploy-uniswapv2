import routerArtifact from "@uniswap/v2-periphery/build/UniswapV2Router02.json";
import hre, { ethers } from "hardhat";
import type { Addressable } from "ethers"
import { SimpleToken } from "../typechain-types"

async function addLq(routerAddress: string | Addressable) {
  const [owner] = await ethers.getSigners();
  let simpleToken: SimpleToken = await ethers.getContract("SimpleToken")
  const approveTx = await simpleToken.approve(routerAddress, ethers.MaxUint256)
  await approveTx.wait()
  const router = await ethers.getContractAt(
    routerArtifact.abi,
    routerAddress,
    owner
  );
  const addLqTx = await router.addLiquidityETH(simpleToken, ethers.parseEther("1"), 0, 0, owner, 10000000000000000n, { value: ethers.parseEther("0.01") })
  await addLqTx.wait()
  console.log("Add liquidity succeeded!")
}

addLq("0xb5b390170A8B8432aD32bda9BeDF4822A020EC73")