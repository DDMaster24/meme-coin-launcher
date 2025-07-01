'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const params = useSearchParams();
  const tokenName = params.get('name');
  const tokenSymbol = params.get('symbol');
  const tokenSupply = params.get('supply');
  const contractAddress = params.get('address');

  return (
    <main className="min-h-screen bg-[#111] text-white p-8 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold text-green-400">🎉 Token Deployed Successfully!</h1>

      {tokenName && tokenSymbol && tokenSupply ? (
        <>
          <p className="text-lg">
            You created <strong>{tokenName}</strong> (
            <span className="text-orange-400">{tokenSymbol}</span>) with{' '}
            <strong>{tokenSupply}</strong> tokens!
          </p>
          <p className="text-sm text-gray-300">
            Contract Address:{' '}
            <span className="text-blue-400 break-words">{contractAddress}</span>
          </p>
        </>
      ) : (
        <p className="text-red-400">Missing token data. Please try again.</p>
      )}
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-white p-8">Loading token data...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
