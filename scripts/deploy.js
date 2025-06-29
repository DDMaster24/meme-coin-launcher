const { ethers } = require("hardhat");

async function main() {
  const ForgeCoin = await ethers.getContractFactory("ForgeCoin");
  const forgeCoin = await ForgeCoin.deploy();

  await forgeCoin.waitForDeployment(); // ⬅️ This is now the correct method

  console.log("ForgeCoin deployed to:", forgeCoin.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
