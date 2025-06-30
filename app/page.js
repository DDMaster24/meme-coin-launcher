'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      localStorage.setItem('walletAddress', accounts[0]);
    } catch (err) {
      console.error(err);
      alert('Failed to connect wallet.');
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-5xl font-extrabold mb-2 text-orange-400">Crypto Forge</h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        The easiest way to forge your own meme coin. 🔥
      </p>

      {walletAddress ? (
        <p className="text-green-400 mb-4">Wallet Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded mb-6 transition-all"
        >
          🔥 Connect Wallet
        </button>
      )}

      <Link
        href="/launch"
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded transition-all"
      >
        🚀 Start Forging
      </Link>
    </main>
  );
}
