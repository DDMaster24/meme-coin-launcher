'use client';

import { useEffect, useState } from 'react';
import { ContractFactory, BrowserProvider } from 'ethers';
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
      setStatus('Connecting to wallet...');
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      setStatus('Deploying your coin...');
      const factory = new ethers.ContractFactory(abi, bytecode, signer);
      const contract = await factory.deploy(tokenName, tokenSymbol, ethers.parseUnits(tokenSupply, 18));
      await contract.waitForDeployment();

      setStatus(`Token deployed at address: ${(await contract.getAddress())}`);
    } catch (err) {
      console.error('Error deploying token:', err);
      setStatus('Deployment failed. See console for details.');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum?.selectedAddress) {
      setWalletAddress(window.ethereum.selectedAddress);
    }
  }, []);

  return (
    <main className="min-h-screen p-8 bg-[#111] text-white flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold">Forge Your Coin</h1>

      {!walletAddress ? (
        <button onClick={connectWallet} className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700">
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
          className="w-full px-4 py-2 text-black rounded"
        />
        <input
          type="text"
          placeholder="Token Symbol"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          className="w-full px-4 py-2 text-black rounded"
        />
        <input
          type="number"
          placeholder="Initial Supply"
          value={tokenSupply}
          onChange={(e) => setTokenSupply(e.target.value)}
          className="w-full px-4 py-2 text-black rounded"
        />
        <button
          onClick={deployToken}
          className="w-full px-4 py-2 bg-orange-600 rounded hover:bg-orange-700"
        >
          Launch My Token
        </button>
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </main>
  );
}
