'use client';

import { useEffect, useState } from 'react';
import { BrowserProvider, ContractFactory, parseUnits } from 'ethers';
import { abi, bytecode } from '@/lib/forgecoin';

export default function LaunchPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenSupply, setTokenSupply] = useState('');
  const [status, setStatus] = useState('');

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    } else {
      alert('MetaMask not found!');
    }
  };

  const deployToken = async () => {
    if (!tokenName || !tokenSymbol || !tokenSupply) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setStatus('Deploying your coin...');
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const factory = new ContractFactory(abi, bytecode, signer);
      const contract = await factory.deploy(tokenName, tokenSymbol, parseUnits(tokenSupply, 18));
      await contract.waitForDeployment();

      setStatus(`Token deployed at address: ${contract.target}`);
    } catch (err) {
      console.error('Error deploying token:', err);
      setStatus('Deployment failed. See console for details.');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      });
    }
  }, []);

  return (
    <main className="min-h-screen p-8 bg-[#111] text-white flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold">Forge Your Coin</h1>
      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      ) : (
        <p>Connected: {walletAddress}</p>
      )}

      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Token Name"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          className="w-full px-4 py-2 bg-[#1f1f1f] text-white placeholder-gray-400 border border-gray-600 rounded"
        />
        <input
          type="text"
          placeholder="Token Symbol"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          className="w-full px-4 py-2 bg-[#1f1f1f] text-white placeholder-gray-400 border border-gray-600 rounded"
        />
        <input
          type="number"
          placeholder="Initial Supply"
          value={tokenSupply}
          onChange={(e) => setTokenSupply(e.target.value)}
          className="w-full px-4 py-2 bg-[#1f1f1f] text-white placeholder-gray-400 border border-gray-600 rounded"
        />

        <button
          onClick={deployToken}
          className="w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 shadow-lg shadow-orange-500/30 transition"
        >
          Launch My Token
        </button>

        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </main>
  );
}
