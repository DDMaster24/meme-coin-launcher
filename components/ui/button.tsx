// components/ui/button.tsx

import React from 'react';

export function Button({
  children,
  onClick,
  className = '',
  variant = 'default',
  size = 'default',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'ghost';
  size?: 'default' | 'icon';
}) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none';
  const variantStyles = {
    default: 'bg-amber-500 text-black hover:bg-amber-400',
    ghost: 'bg-transparent hover:bg-[#333] text-white',
  };
  const sizeStyles = {
    default: 'px-4 py-2 text-sm',
    icon: 'p-2',
  };

  return (
    <button onClick={onClick} className={`${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </button>
  );
}
