"use client";
import React, { useState } from "react";
import { ethers } from "ethers";

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState("");

  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not detected. Please install MetaMask to use this feature.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  }

  function disconnectWallet() {
    setWalletAddress("");
  }

  const [tokenName, setTokenName] = useState("PepePump");
  const [symbol, setSymbol] = useState("PEP");
  const [supply, setSupply] = useState("1000000");

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #1e3a8a, #6b21a8, #000)",
      color: "white",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Meme Coin Launcher</h1>
        {walletAddress ? (
          <div>
            <span style={{ marginRight: "1rem", fontSize: "0.9rem", color: "#ccc" }}>
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
            <button onClick={disconnectWallet} style={{ backgroundColor: "#e11d48", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: "8px" }}>
              Disconnect
            </button>
          </div>
        ) : (
          <button onClick={connectWallet} style={{ backgroundColor: "#9333ea", color: "white", padding: "0.75rem 1.5rem", border: "none", borderRadius: "12px" }}>
            🔌 Connect Wallet
          </button>
        )}
      </header>

      {/* Main */}
      <main style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "3rem" }}>
        {/* Form Area */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Launch Your Meme Coin</h2>

          <div style={{ marginBottom: "1rem" }}>
            <label>Token Name:</label><br />
            <input
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              style={{ padding: "0.5rem", width: "100%", borderRadius: "8px", marginTop: "0.5rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Symbol:</label><br />
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              style={{ padding: "0.5rem", width: "100%", borderRadius: "8px", marginTop: "0.5rem" }}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label>Total Supply:</label><br />
            <input
              value={supply}
              onChange={(e) => setSupply(e.target.value)}
              style={{ padding: "0.5rem", width: "100%", borderRadius: "8px", marginTop: "0.5rem" }}
            />
          </div>

          <button style={{ backgroundColor: "#facc15", color: "#000", padding: "1rem 2rem", border: "none", fontWeight: "bold", fontSize: "1.2rem", borderRadius: "16px" }}>
            🚀 Launch Coin
          </button>
        </div>

        {/* Preview Area */}
        <div style={{ flex: 1, backgroundColor: "rgba(107, 33, 168, 0.3)", padding: "2rem", borderRadius: "12px", backdropFilter: "blur(10px)" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Coin Preview</h3>
          <p><strong>Token Name:</strong> {tokenName}</p>
          <p><strong>Symbol:</strong> {symbol}</p>
          <p><strong>Supply:</strong> {supply}</p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: "center", marginTop: "4rem", color: "#aaa" }}>
        Built with 💜 by DDM Technology
      </footer>
    </div>
  );
}
