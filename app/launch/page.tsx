'use client';

import { useEffect, useState } from 'react';

export default function LaunchPage() {
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  if (!walletAddress) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
        <h1 className="text-3xl text-red-500 mb-4">⚠️ Wallet Not Connected</h1>
        <p className="text-center text-gray-300">
          Please return to the <a href="/" className="text-blue-400 underline">homepage</a> and connect your wallet before launching your coin.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-extrabold mb-2 text-orange-400">Forge Your Coin</h1>
      <p className="text-green-400 mb-6">Wallet Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>

      {/* You can re-add your coin form here or keep it modular */}
      <p className="text-gray-400">🛠️ Form coming next...</p>
    </main>
  );
}
