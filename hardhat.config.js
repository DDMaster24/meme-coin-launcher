require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/https://sepolia.infura.io/v3/0a6285c016a4432a911912db8e4c85f3",
      accounts: ["9fc437d2e8b364222d284a962241f3a2ce28e41bc44f60b17bf77e6d3c7b8850"]
    }
  }
};
