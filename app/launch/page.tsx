'use client';

import { useEffect, useState } from 'react';
import { ContractFactory, BrowserProvider, parseUnits } from 'ethers';
import { abi, bytecode } from '@/lib/forgecoin';
import { useRouter } from 'next/navigation';

export default function LaunchPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenSupply, setTokenSupply] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } else {
      alert('Please install MetaMask');
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
      const contract = await factory.deploy(
        tokenName,
        tokenSymbol,
        parseUnits(tokenSupply, 18)
      );
      await contract.waitForDeployment();

      const deployedAddress = await contract.getAddress();
      setStatus('Token deployed at:');

      // Save to localStorage
      const newToken = {
        address: deployedAddress,
        name: tokenName,
        symbol: tokenSymbol,
        supply: tokenSupply,
      };

      const existing = JSON.parse(localStorage.getItem('forgeTokens') || '[]');
      localStorage.setItem('forgeTokens', JSON.stringify([...existing, newToken]));

      // Redirect with query params
      router.push(
        `/success?address=${deployedAddress}&name=${tokenName}&symbol=${tokenSymbol}&supply=${tokenSupply}`
      );
    } catch (err) {
      console.error('Error deploying token:', err);
      setStatus('Deployment failed. See console for details.');
    }
  };

  useEffect(() => {
  const checkWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (err) {
        console.error('Error fetching connected accounts:', err);
      }
    }
  };
  checkWallet();
}, []);


  return (
    <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Forge Your Coin</h1>
      {walletAddress ? (
        <p>Connected: {walletAddress}</p>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            backgroundColor: '#ff5c00',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            marginBottom: '1.5rem',
          }}
        >
          Connect Wallet
        </button>
      )}

      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <input
          type="text"
          placeholder="Token Name"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#222',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '4px',
          }}
        />
        <input
          type="text"
          placeholder="Token Symbol"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#222',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '4px',
          }}
        />
        <input
          type="number"
          placeholder="Initial Supply"
          value={tokenSupply}
          onChange={(e) => setTokenSupply(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            backgroundColor: '#222',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={deployToken}
          style={{
            backgroundColor: '#ffa500',
            color: 'black',
            padding: '12px 30px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 0 20px 2px #ffa500',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Launch My Token
        </button>
        <p style={{ marginTop: '1rem', color: '#ccc' }}>{status}</p>
      </div>
    </div>
  );
}
