// app/success/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tokenAddress = searchParams.get('address');
  const name = searchParams.get('name');
  const symbol = searchParams.get('symbol');
  const supply = searchParams.get('supply');

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!tokenAddress) {
      router.push('/launch'); // fallback
    }

    const timer = setTimeout(() => {
      router.push('/monitor');
    }, 15000); // redirect after 15 seconds

    return () => clearTimeout(timer);
  }, [tokenAddress, router]);

  const handleCopy = () => {
    if (tokenAddress) {
      navigator.clipboard.writeText(tokenAddress);
      toast.success('Token address copied!');
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] text-white p-6">
      <Card className="w-full max-w-xl bg-[#1f1f1f] border border-gray-700 shadow-xl rounded-2xl">
        <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
          <h1 className="text-3xl font-bold text-amber-400">🔥 Forge Complete!</h1>

          <p className="text-sm text-gray-300">
            Your ERC-20 token has been successfully deployed.
          </p>

          {name && symbol && supply && (
            <div className="text-gray-400 text-sm space-y-1">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Symbol:</strong> {symbol}</p>
              <p><strong>Supply:</strong> {supply}</p>
            </div>
          )}

          {tokenAddress && (
            <div className="w-full break-words bg-gray-800 p-3 rounded-lg text-sm border border-gray-700 relative">
              <code>{tokenAddress}</code>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}

          <a
            href={`https://sepolia.etherscan.io/address/${tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-amber-300 hover:underline text-sm"
          >
            View on Etherscan <ExternalLink className="h-4 w-4" />
          </a>

          <p className="text-xs text-gray-500">
            You will be redirected to your Monitoring page shortly...
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
