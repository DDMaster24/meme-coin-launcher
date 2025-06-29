'use client'

import { useState } from 'react';

export default function LaunchPage() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Launching Token with values:');
    console.log('Name:', name);
    console.log('Symbol:', symbol);
    console.log('Supply:', supply);
    alert(`Token Created (Mock): ${name} - ${symbol} - ${supply}`);
  };

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-[#1e1e2f] text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Create Your Token</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Token Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 rounded text-black"
          required
        />
        <input
          type="text"
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="p-3 rounded text-black"
          required
        />
        <input
          type="number"
          placeholder="Initial Supply"
          value={supply}
          onChange={(e) => setSupply(e.target.value)}
          className="p-3 rounded text-black"
          required
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-6 rounded font-semibold"
        >
          Launch Coin
        </button>
      </form>
    </div>
  );
}
