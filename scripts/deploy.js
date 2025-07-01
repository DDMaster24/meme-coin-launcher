const { ethers } = require("hardhat");

async function main() {
  const name = "Forge Coin";
  const symbol = "FCC";
  const supply = ethers.parseUnits("1000000", 18); // 1 million with 18 decimals

  const ForgeCoin = await ethers.getContractFactory("ForgeCoin");
  const forgeCoin = await ForgeCoin.deploy(name, symbol, supply);

  await forgeCoin.waitForDeployment();

  console.log("ForgeCoin deployed to:", forgeCoin.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
