// app/monitor/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface Token {
  address: string;
  name: string;
  symbol: string;
  supply: string;
}

export default function MonitorPage() {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('forgeTokens');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTokens(parsed);
      } catch (err) {
        toast.error('Error loading saved tokens');
      }
    }
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] text-white">
      <h1 className="text-3xl font-bold text-amber-400 mb-6 text-center">🛠️ My Forged Tokens</h1>

      {tokens.length === 0 ? (
        <p className="text-center text-gray-400">No tokens found. Forge one on the Launch page.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tokens.map((token, index) => (
            <Card
              key={index}
              className="bg-[#1f1f1f] border border-gray-700 shadow-lg rounded-xl"
            >
              <CardContent className="p-6 space-y-2 text-sm text-gray-300">
                <p><span className="text-white font-semibold">Name:</span> {token.name}</p>
                <p><span className="text-white font-semibold">Symbol:</span> {token.symbol}</p>
                <p><span className="text-white font-semibold">Supply:</span> {token.supply}</p>
                <p className="break-all">
                  <span className="text-white font-semibold">Address:</span> {token.address}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
