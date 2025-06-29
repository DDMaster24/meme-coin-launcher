'use client'

import { useState } from 'react'
import { ethers } from 'ethers'

const CONTRACT_SOURCE = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.20;

  import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

  contract ForgeCoin is ERC20 {
      constructor(string memory name, string memory symbol, uint256 initialSupply)
          ERC20(name, symbol)
      {
          _mint(msg.sender, initialSupply * 10 ** decimals());
      }
  }
`;

export default function LaunchPage() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask!');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setWalletAddress(accounts[0]);
  };

  const handleDeploy = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setContractAddress('');

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const factory = await ethers.ContractFactory.fromSolidity(
        { sources: { 'ForgeCoin.sol': { content: CONTRACT_SOURCE } } },
        signer
      );

      const contract = await factory.deploy(name, symbol, Number(supply));
      await contract.waitForDeployment();

      setContractAddress(await contract.getAddress());
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-[#1e1e2f] text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Create Your Token</h1>

      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded mb-6"
        >
          Connect Wallet
        </button>
      ) : (
        <p className="text-green-400 mb-4">Wallet Connected: {walletAddress}</p>
      )}

      <form onSubmit={handleDeploy} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Token Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 rounded text-black"
          required
        />
        <input
          type="text"
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="p-3 rounded text-black"
          required
        />
        <input
          type="number"
          placeholder="Initial Supply"
          value={supply}
          onChange={(e) => setSupply(e.target.value)}
          className="p-3 rounded text-black"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`py-3 px-6 rounded font-semibold ${
            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 text-black'
          }`}
        >
          {loading ? 'Deploying...' : 'Launch Coin'}
        </button>
      </form>

      {contractAddress && (
        <p className="mt-6 text-green-300">
          🎉 Token deployed to: <br />
          <a
            href={`https://sepolia.etherscan.io/address/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {contractAddress}
          </a>
        </p>
      )}

      {error && <p className="mt-6 text-red-400">❌ Error: {error}</p>}
    </div>
  );
}
