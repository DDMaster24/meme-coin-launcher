"use client";
import React, { useState } from "react";

export default function HomePage() {
  const [tier, setTier] = useState("basic");
  const [tokenName, setTokenName] = useState("PepePump");
  const [symbol, setSymbol] = useState("PEP");
  const [supply, setSupply] = useState("1000000");

  const fee = tier === "basic" ? "0.15 SOL" : "0.7 SOL";

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #fef3c7, #fde68a, #fcd34d)",
      padding: "2rem",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#3b2f2f",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      {/* Page Title */}
      <h1 style={{
        fontSize: "3.5rem",
        fontWeight: "bold",
        textShadow: "0 0 10px #fbbf24, 0 0 20px #f59e0b",
        marginBottom: "0.5rem"
      }}>
        🔥 Crypto Forge
      </h1>

      {/* Subtitle */}
      <h2 style={{
        fontSize: "1.4rem",
        fontStyle: "italic",
        color: "#4b3a2f",
        marginBottom: "2rem"
      }}>
        The Easy Meme Coin Launcher
      </h2>

      {/* Coin Forge Form */}
      <div style={{
        backgroundColor: "#fff8e1",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 0 15px #facc15aa",
        maxWidth: "600px",
        width: "100%"
      }}>
        {/* Tier Selector */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ marginRight: "1rem", fontWeight: "bold" }}>Select Tier:</label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            style={{
              padding: "0.6rem",
              borderRadius: "8px",
              fontSize: "1rem",
              backgroundColor: "#fff7c2"
            }}
          >
            <option value="basic">Basic (0.15 SOL)</option>
            <option value="advanced">Advanced (0.7 SOL)</option>
          </select>
        </div>

        {/* Token Name */}
        <div style={{ marginBottom: "1rem" }}>
          <label>🪙 Token Name:</label><br />
          <input
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            placeholder="e.g. PepePump"
            style={{ width: "100%", padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />
        </div>

        {/* Symbol */}
        <div style={{ marginBottom: "1rem" }}>
          <label>💠 Symbol:</label><br />
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="e.g. PEP"
            style={{ width: "100%", padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />
        </div>

        {/* Supply */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label>🔢 Total Supply:</label><br />
          <input
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            placeholder="e.g. 1000000"
            style={{ width: "100%", padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />
        </div>

        {/* Fee Display */}
        <div style={{ fontWeight: "bold", marginBottom: "1.5rem" }}>
          🔥 Estimated Launch Fee: {fee}
        </div>

        {/* Forge Button */}
        <button style={{
          padding: "1rem 2rem",
          fontSize: "1.1rem",
          backgroundColor: "#f59e0b",
          border: "none",
          borderRadius: "12px",
          color: "white",
          fontWeight: "bold",
          boxShadow: "0 0 15px #f59e0b88",
          cursor: "pointer"
        }}>
          🚀 Forge Your Coin
        </button>
      </div>
    </div>
  );
}
