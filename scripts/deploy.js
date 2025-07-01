const { ethers } = require("hardhat");

async function main() {
  const tokenName = "Forge Coin";
  const tokenSymbol = "FCC";
  const tokenSupply = 1_000_000; // 1 million tokens

  const ForgeCoin = await ethers.getContractFactory("ForgeCoin");
  const forgeCoin = await ForgeCoin.deploy(tokenName, tokenSymbol, tokenSupply);

  await forgeCoin.waitForDeployment();

  console.log(`ForgeCoin deployed to: ${forgeCoin.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
