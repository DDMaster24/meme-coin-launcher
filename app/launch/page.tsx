'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { contractSource } from '../utils/ForgeCoin';

export default function LaunchPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('Please install MetaMask to continue');
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error('Wallet connect error:', err);
      setStatusMessage('Failed to connect wallet');
    }
  };

  const deployToken = async () => {
    setStatusMessage('');

    if (!walletAddress || !tokenName || !tokenSymbol || !initialSupply) {
      setStatusMessage('Please fill in all fields and connect your wallet.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Compile in-browser using ethers.ContractFactory and ABI+Bytecode (future step)
      // For now use placeholder log to simulate:
      console.log('Deploying with:', {
        name: tokenName,
        symbol: tokenSymbol,
        supply: initialSupply,
        wallet: walletAddress,
      });

      setStatusMessage(`Mock token created: ${tokenName} (${tokenSymbol}) with supply ${initialSupply}`);
    } catch (error) {
      console.error(error);
      setStatusMessage('Deployment failed. Check the console for more info.');
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-extrabold mb-2 text-orange-400">Crypto Forge</h1>
      <p className="text-lg text-gray-300 mb-10">Easily launch your own meme coin in seconds.</p>

      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded transition-all mb-6 border-4 border-white"
        >
          🔥 Connect Wallet
        </button>
      ) : (
        <p className="text-green-400 mb-4">Wallet Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
      )}

      <div className="bg-[#1a1a1a] p-6 rounded shadow-lg w-full max-w-md space-y-4 border border-orange-600">
        <input
          type="text"
          placeholder="Token Name (e.g. ForgeCoin)"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          className="w-full p-3 bg-black text-white border border-gray-600 rounded"
        />
        <input
          type="text"
          placeholder="Token Symbol (e.g. FCC)"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          className="w-full p-3 bg-black text-white border border-gray-600 rounded"
        />
        <input
          type="number"
          placeholder="Initial Supply (e.g. 1000000)"
          value={initialSupply}
          onChange={(e) => setInitialSupply(e.target.value)}
          className="w-full p-3 bg-black text-white border border-gray-600 rounded"
        />
        <button
          onClick={deployToken}
          className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded font-bold hover:opacity-90 transition-all"
        >
          🔨 Launch Coin
        </button>
      </div>

      {statusMessage && (
        <div className="mt-6 text-center text-sm text-blue-300 bg-[#1a1a1a] p-3 rounded max-w-md">
          {statusMessage}
        </div>
      )}
    </main>
  );
}
