'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const address = searchParams.get('address');

  return (
    <main className="min-h-screen p-8 bg-[#111] text-white flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold text-green-400">🎉 Token Created Successfully!</h1>

      {address ? (
        <p className="text-lg text-center">
          Your token is live on the blockchain at:
          <br />
          <span className="font-mono text-yellow-400">{address}</span>
        </p>
      ) : (
        <p className="text-red-400">No address found in URL.</p>
      )}

      <Link href="/" className="px-6 py-2 mt-4 bg-blue-600 rounded hover:bg-blue-700">
        🔙 Return to Home
      </Link>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="text-white text-center p-10">Loading success info...</p>}>
      <SuccessContent />
    </Suspense>
  );
}
