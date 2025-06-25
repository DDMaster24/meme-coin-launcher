"use client";
import React, { useState } from "react";
import { ethers } from "ethers";

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenName, setTokenName] = useState("PepePump");
  const [symbol, setSymbol] = useState("PEP");
  const [supply, setSupply] = useState("1000000");

  const [launching, setLaunching] = useState(false);
  const [launchSuccess, setLaunchSuccess] = useState(false);

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

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#000",
      backgroundImage: "radial-gradient(circle at top left, rgba(0,255,255,0.08), transparent), radial-gradient(circle at bottom right, rgba(255,0,255,0.08), transparent)",
      color: "white",
      fontFamily: "'Segoe UI', sans-serif",
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
            <button
              onClick={disconnectWallet}
              style={{
                backgroundColor: "#ef4444",
                padding: "0.6rem 1.2rem",
                border: "none",
                borderRadius: "10px",
                color: "white",
                boxShadow: "0 0 10px #ef4444aa",
                cursor: "pointer"
              }}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            style={{
              backgroundColor: "#00ffff",
              color: "#000",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: "bold",
              boxShadow: "0 0 15px #00ffff99",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
          >
            🔌 Connect Wallet
          </button>
        )}
      </header>

      {/* Main */}
      <main style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {/* Coin Form */}
        <div style={{
          flex: 1,
          backgroundColor: "#111",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 0 20px #facc15aa"
        }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", fontWeight: "600" }}>
            Create Your Meme Coin
          </h2>

          <div style={{ marginBottom: "1rem" }}>
            <label>🪙 Token Name:</label><br />
            <input
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "none", marginTop: "0.4rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>💠 Symbol:</label><br />
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "none", marginTop: "0.4rem" }}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label>🔢 Total Supply:</label><br />
            <input
              value={supply}
              onChange={(e) => setSupply(e.target.value)}
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
              boxShadow: "0 0 20px #facc1599"
            }}
            onClick={() => {
              setLaunching(true);
              setLaunchSuccess(false);
              setTimeout(() => {
                setLaunching(false);
                setLaunchSuccess(true);
              }, 2500);
            }}
          >
            🚀 Launch Coin
          </button>

          {launching && (
            <p style={{ marginTop: "1rem", color: "#38bdf8", fontWeight: "500" }}>
              ⏳ Launching your meme coin...
            </p>
          )}
          {launchSuccess && (
            <p style={{ marginTop: "1rem", color: "#4ade80", fontWeight: "500" }}>
              ✅ {tokenName} ({symbol}) with {supply} tokens has been launched!
            </p>
          )}
        </div>

        {/* Coin Preview */}
        <div style={{
          flex: 1,
          backgroundColor: "#0a0a0a",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 0 25px #38bdf8aa",
        }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1.2rem", fontWeight: "600" }}>
            Coin Preview
          </h3>
          <div style={{
            backgroundColor: "#000",
            padding: "1.5rem",
            borderRadius: "10px",
            fontFamily: "monospace",
            fontSize: "1.1rem",
            color: "#38bdf8",
            boxShadow: "inset 0 0 8px #38bdf899"
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
        Built with 💜 by DDM Technology | Powered by React + Web3
      </footer>
    </div>
  );
}
