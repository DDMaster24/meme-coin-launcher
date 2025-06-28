"use client";
import React, { useState } from "react";

export default function HomePage() {
  const [tier, setTier] = useState("basic");
  const [tokenName, setTokenName] = useState("PepePump");
  const [symbol, setSymbol] = useState("PEP");
  const [supply, setSupply] = useState("1000000");
  const [logo, setLogo] = useState(null);
  const [launching, setLaunching] = useState(false);
  const [launchSuccess, setLaunchSuccess] = useState(false);

  const fee = tier === "basic" ? "0.15 SOL" : "0.7 SOL";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #fef3c7, #fde68a, #fcd34d)",
        padding: "2rem",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#3b2f2f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          textShadow: "0 0 10px #fbbf24, 0 0 20px #f59e0b",
          marginBottom: "0.5rem",
        }}
      >
        🔥 Crypto Forge
      </h1>

      {/* Subtitle */}
      <h2
        style={{
          fontSize: "1.4rem",
          fontStyle: "italic",
          color: "#4b3a2f",
          marginBottom: "2rem",
        }}
      >
        The Easy Meme Coin Launcher
      </h2>

      {/* Forge Form */}
      <div
        style={{
          backgroundColor: "#fff8e1",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 0 15px #facc15aa",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        {/* Tier Selector */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ marginRight: "1rem", fontWeight: "bold" }}>
            Select Tier:
          </label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            style={{
              padding: "0.6rem",
              borderRadius: "8px",
              fontSize: "1rem",
              backgroundColor: "#fff7c2",
            }}
          >
            <option value="basic">Basic (0.15 SOL)</option>
            <option value="advanced">Advanced (0.7 SOL)</option>
          </select>
        </div>

        {/* Token Name */}
        <div style={{ marginBottom: "1rem" }}>
          <label>🪙 Token Name:</label>
          <br />
          <input
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            placeholder="e.g. PepePump"
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Symbol */}
        <div style={{ marginBottom: "1rem" }}>
          <label>💠 Symbol:</label>
          <br />
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="e.g. PEP"
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Supply */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label>🔢 Total Supply:</label>
          <br />
          <input
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            placeholder="e.g. 1000000"
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Logo Upload */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label>🖼️ Upload Logo (optional):</label>
          <br />
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setLogo(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
            style={{ marginTop: "0.5rem" }}
          />
        </div>

        {/* Logo Preview */}
        {logo && (
          <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
            <p style={{ fontWeight: "bold" }}>Preview:</p>
            <img
              src={logo}
              alt="Coin Logo Preview"
              style={{
                maxHeight: "100px",
                borderRadius: "12px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}

        {/* Fee Display */}
        <div style={{ fontWeight: "bold", marginBottom: "1.5rem" }}>
          🔥 Estimated Launch Fee: {fee}
        </div>

        {/* Forge Button */}
        <button
          onClick={() => {
            setLaunching(true);
            setLaunchSuccess(false);
            setTimeout(() => {
              setLaunching(false);
              setLaunchSuccess(true);
            }, 2500);
          }}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.1rem",
            backgroundColor: "#f59e0b",
            border: "none",
            borderRadius: "12px",
            color: "white",
            fontWeight: "bold",
            boxShadow: "0 0 15px #f59e0b88",
            cursor: "pointer",
          }}
        >
          🚀 Forge Your Coin
        </button>

        {/* Launching / Success Messages */}
        {launching && (
          <p
            style={{
              marginTop: "1rem",
              color: "#38bdf8",
              fontWeight: "500",
            }}
          >
            ⏳ Forging your coin...
          </p>
        )}
        {launchSuccess && (
          <p
            style={{
              marginTop: "1rem",
              color: "#4ade80",
              fontWeight: "500",
            }}
          >
            ✅ {tokenName} ({symbol}) with {supply} tokens has been forged!
          </p>
        )}
      </div>
    </div>
  );
}
