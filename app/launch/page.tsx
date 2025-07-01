'use client';

import { useEffect, useState } from 'react';
import { ContractFactory, BrowserProvider, parseUnits } from 'ethers';
import { abi, bytecode } from '@/lib/forgecoin';
import { useRouter } from 'next/navigation';

export default function LaunchPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenSupply, setTokenSupply] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum?.request) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum?.request) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error('Wallet connection failed:', err);
      }
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

      const address = await contract.getAddress();
      setStatus(`Token deployed at: ${address}`);
      router.push(`/success?address=${address}`);
    } catch (error) {
      console.error('Deployment failed:', error);
      setStatus('Deployment failed. See console for details.');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#111', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Forge Your Coin</h1>
      {walletAddress ? (
        <p style={{ color: '#aaa', marginBottom: '1rem' }}>Connected: {walletAddress}</p>
      ) : (
        <button onClick={connectWallet} style={{ backgroundColor: 'orange', color: 'white', padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', marginBottom: '1rem' }}>
          Connect Wallet
        </button>
      )}

      <div style={{ maxWidth: '400px', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Token Name"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' }}
        />
        <input
          type="text"
          placeholder="Token Symbol"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' }}
        />
        <input
          type="number"
          placeholder="Token Supply"
          value={tokenSupply}
          onChange={(e) => setTokenSupply(e.target.value)}
          style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' }}
        />
      </div>

      <button onClick={deployToken} style={{
        marginTop: '1rem',
        backgroundColor: 'orange',
        color: '#fff',
        padding: '0.75rem 2rem',
        fontSize: '1.1rem',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 0 10px rgba(255,140,0,0.8)',
        transition: 'transform 0.1s ease-in-out',
      }}>
        Launch My Token
      </button>

      {status && <p style={{ marginTop: '1rem', color: '#ccc' }}>{status}</p>}
    </div>
  );
}
