'use client';

import { useEffect, useState } from 'react';

export default function LaunchPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenSupply, setTokenSupply] = useState('');
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchMessage, setLaunchMessage] = useState('');

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  const handleLaunch = async () => {
    if (!tokenName || !tokenSymbol || !tokenSupply) {
      setLaunchMessage('❌ Please fill in all fields.');
      return;
    }

    setIsLaunching(true);
    setLaunchMessage('🔥 Forging your coin...');

    // Simulated delay (you’ll replace this with smart contract interaction later)
    setTimeout(() => {
      setIsLaunching(false);
      setLaunchMessage(`✅ Coin "${tokenName}" (${tokenSymbol}) with ${tokenSupply} tokens has been forged successfully!`);
    }, 3000);
  };

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
    <main className="min-h-screen bg-[#1b1b1b] text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-orange-400">Forge Your Meme Coin 🔨</h1>
      <p className="text-green-400 mb-4">
        Wallet Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
      </p>

      <div className="bg-[#2b2b2b] p-8 rounded shadow-lg w-full max-w-md space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium">Token Name</label>
          <input
            type="text"
            placeholder="e.g. Forge Coin"
            className="w-full px-4 py-2 rounded bg-[#1a1a1a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Token Symbol</label>
          <input
            type="text"
            placeholder="e.g. FGC"
            className="w-full px-4 py-2 rounded bg-[#1a1a1a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Total Supply</label>
          <input
            type="number"
            placeholder="e.g. 1000000"
            className="w-full px-4 py-2 rounded bg-[#1a1a1a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={tokenSupply}
            onChange={(e) => setTokenSupply(e.target.value)}
          />
        </div>

        <button
          onClick={handleLaunch}
          disabled={isLaunching}
          className={`w-full py-3 rounded font-bold transition-all ${
            isLaunching
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-700 text-white'
          }`}
        >
          {isLaunching ? '🔨 Forging...' : '🚀 Launch My Coin'}
        </button>

        {launchMessage && (
          <p className="text-center mt-4 text-sm text-yellow-400">{launchMessage}</p>
        )}
      </div>
    </main>
  );
}
