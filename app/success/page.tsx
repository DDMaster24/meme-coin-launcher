// app/success/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const params = useSearchParams();

  const name = params.get('name');
  const symbol = params.get('symbol');
  const supply = params.get('supply');
  const address = params.get('address');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#111] text-white p-6">
      <div className="max-w-lg w-full text-center space-y-6 bg-[#1a1a1a] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-orange-400">🔥 Token Forged!</h1>

        <p className="text-lg">Your token was successfully deployed to the blockchain.</p>

        <div className="text-left space-y-2">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Symbol:</strong> {symbol}</p>
          <p><strong>Total Supply:</strong> {supply} {symbol}</p>
          <p><strong>Contract Address:</strong> <span className="break-words text-orange-300">{address}</span></p>
          <a 
            href={`https://sepolia.etherscan.io/address/${address}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            View on Etherscan
          </a>
        </div>

        <a 
          href="/launch" 
          className="mt-6 inline-block px-6 py-2 bg-orange-600 hover:bg-orange-700 rounded text-white"
        >
          Forge Another Coin
        </a>
      </div>
    </main>
  );
}
