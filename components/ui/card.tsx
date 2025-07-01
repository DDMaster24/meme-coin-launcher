// components/ui/card.tsx

import React from 'react';

export function Card({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-lg bg-[#1c1c1c] p-4 shadow ${className}`}>{children}</div>;
}

export function CardContent({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`space-y-2 ${className}`}>{children}</div>;
}
