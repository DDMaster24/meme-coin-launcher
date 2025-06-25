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
      background: "linear-gradient(to bottom right, #0f172a, #1e293b, #000)",
      color: "white",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "2rem"
    }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: "bold", letterSpacing: "1px" }}>
          🚀 Meme Coin Launcher
        </h1>
        {walletAddress ? (
          <div>
            <span style={{ marginRight: "1rem", fontSize: "0.95rem", color: "#ccc" }}>
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
            <button onClick={disconnectWallet} style={{ backgroundColor: "#ef4444", padding: "0.6rem 1.2rem", border: "none", borderRadius: "10px", color: "white" }}>
              Disconnect
            </button>
          </div>
        ) : (
          <button onClick={connectWallet} style={{ backgroundColor: "#6366f1", padding: "0.75rem 1.5rem", border: "none", borderRadius: "12px", fontSize: "1rem", fontWeight: "bold", color: "white" }}>
            🔌 Connect Wallet
          </button>
        )}
      </header>

      {/* Main Grid */}
      <main style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {/* Left: Coin Form */}
        <div style={{
          flex: 1,
          backgroundColor: "#1e293b",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.05)"
        }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", fontWeight: "600" }}>
            Create Your Meme Coin
          </h2>

          <div style={{ marginBottom: "1rem" }}>
            <label>🪙 Token Name:</label><br />
            <input
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="e.g. PepePump"
              style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "none", marginTop: "0.4rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>💠 Symbol:</label><br />
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="e.g. PEP"
              style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "none", marginTop: "0.4rem" }}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label>🔢 Total Supply:</label><br />
            <input
              value={supply}
              onChange={(e) => setSupply(e.target.value)}
              placeholder="e.g. 1000000"
              style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "none", marginTop: "0.4rem" }}
            />
          </div>

          <button
            style={{
              backgroundColor: "#facc15",
              color: "#000",
              padding: "1rem 2rem",
              fontWeight: "bold",
              fontSize: "1.1rem",
              border: "none",
              borderRadius: "14px",
              cursor: "pointer",
              transition: "0.2s ease",
            }}
            onClick={() => alert("🚧 Launching functionality coming soon!")}
          >
            🚀 Launch Coin
          </button>
        </div>

        {/* Right: Coin Preview */}
        <div style={{
          flex: 1,
          backgroundColor: "#111827",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.05)"
        }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1.2rem", fontWeight: "600" }}>
            Coin Preview
          </h3>
          <div style={{
            backgroundColor: "#0f172a",
            padding: "1.5rem",
            borderRadius: "10px",
            fontFamily: "monospace",
            fontSize: "1.1rem",
            color: "#38bdf8"
          }}>
            Token Name: <strong>{tokenName}</strong><br />
            Symbol: <strong>{symbol}</strong><br />
            Supply: <strong>{supply}</strong><br />
            Owner: <span style={{ color: "#f87171" }}>{walletAddress ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4) : "Not connected"}</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: "center", marginTop: "4rem", fontSize: "0.9rem", color: "#888" }}>
        Built with 💜 by DDM Technology | Web3 ready
      </footer>
    </div>
  );
}
