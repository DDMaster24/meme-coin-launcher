'use client';

import { useEffect, useState } from 'react';
import { BrowserProvider, ContractFactory, parseUnits } from 'ethers';
import { abi, bytecode } from '@/lib/forgecoin';
import { useRouter } from 'next/navigation';

export default function LaunchPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error('Wallet connection failed:', err);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const deployToken = async () => {
    try {
      setStatus('Deploying your coin...');
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const factory = new ContractFactory(abi, bytecode, signer);

      const contract = await factory.deploy(
        // These values are hardcoded for now
        'Forge Coin',
        'FCC',
        parseUnits('1000000', 18)
      );
      await contract.waitForDeployment();

      setStatus(`Token deployed at: ${contract.target}`);
      router.push(`/success?address=${contract.target}`);
    } catch (error) {
      console.error('Error deploying token:', error);
      setStatus('Deployment failed. See console for details.');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        });
    }
  }, []);

  return (
    <main className="min-h-screen p-8 bg-black text-white flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold mb-2">Forge Your Coin</h1>
      {walletAddress ? (
        <p className="text-sm">Connected: {walletAddress}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      )}

      <p className="text-center text-gray-300">
        This coin is preconfigured as <strong>Forge Coin (FCC)</strong> with 1 million supply.
      </p>

      <button
        onClick={deployToken}
        className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded shadow-md transition transform hover:scale-105"
      >
        Launch My Token
      </button>

      {status && <p className="mt-4 text-center">{status}</p>}
    </main>
  );
}
