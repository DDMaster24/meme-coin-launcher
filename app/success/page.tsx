'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const address = searchParams.get('address');

  return (
    <main className="min-h-screen p-8 bg-black text-white flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold mb-2">🎉 Token Successfully Forged!</h1>
      {address ? (
        <p className="text-center">
          Your token was deployed at:
          <br />
          <code className="text-orange-400 break-all">{address}</code>
        </p>
      ) : (
        <p className="text-center text-red-400">
          Deployment address not found in URL.
        </p>
      )}
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
