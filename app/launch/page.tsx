'use client';

import { useEffect, useState } from 'react';
import { BrowserProvider, ContractFactory, parseUnits } from 'ethers';
import { abi, bytecode } from '@/lib/forgecoin';

export default function LaunchPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [status, setStatus] = useState('');

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setWalletAddress(accounts[0]);
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

    const factory = new ContractFactory(abi, bytecode, signer);
    setStatus('Deploying your coin...');

    const contract = await factory.deploy(
      tokenName,
      tokenSymbol,
      parseUnits(tokenSupply, 18)
    );
    await contract.waitForDeployment();

    const address = await contract.getAddress();

    // Redirect to success page with query params
    window.location.href = `/success?name=${encodeURIComponent(tokenName)}&symbol=${encodeURIComponent(tokenSymbol)}&supply=${encodeURIComponent(tokenSupply)}&address=${address}`;
  } catch (err) {
    console.error('Error deploying token:', err);
    setStatus('Deployment failed. See console for details.');
  }
};

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      const provider = new BrowserProvider(window.ethereum);
      provider.send('eth_accounts', []).then((accounts) => {
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
        <button onClick={connectWallet} className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700">
          Connect Wallet
        </button>
      ) : (
        <p>Connected: {walletAddress}</p>
      )}

      <div className="w-full max-w-md space-y-4">
        <p className="text-gray-300 text-center">This coin is preconfigured as <strong>Forge Coin (FCC)</strong> with 1 million supply.</p>

        <button
          onClick={deployToken}
          className="w-full px-4 py-2 bg-orange-600 rounded hover:bg-orange-700 transition-all"
        >
          Launch My Token
        </button>
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </main>
  );
}
