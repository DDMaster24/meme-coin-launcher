import React from "react";

export default function HomePage() {
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
        <button style={{ backgroundColor: "#9333ea", color: "white", padding: "0.75rem 1.5rem", border: "none", borderRadius: "12px" }}>
          🔌 Connect Wallet
        </button>
      </header>

      {/* Main */}
      <main style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "3rem" }}>
        {/* Text Area */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Launch Your Meme Coin Instantly</h2>
          <p style={{ fontSize: "1.1rem", color: "#ccc", marginBottom: "2rem" }}>
            Choose your coin name, symbol, and supply. Deploy it with anti-rug protection in seconds.
          </p>
          <button style={{ backgroundColor: "#facc15", color: "#000", padding: "1rem 2rem", border: "none", fontWeight: "bold", fontSize: "1.2rem", borderRadius: "16px" }}>
            🚀 Launch a Coin
          </button>
        </div>

        {/* Visual Preview */}
        <div style={{ flex: 1, backgroundColor: "rgba(107, 33, 168, 0.3)", padding: "2rem", borderRadius: "12px", backdropFilter: "blur(10px)" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Coin Preview</h3>
          <p><strong>Token Name:</strong> PepePump</p>
          <p><strong>Symbol:</strong> PEP</p>
          <p><strong>Supply:</strong> 1,000,000</p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: "center", marginTop: "4rem", color: "#aaa" }}>
        Built with 💜 by DDM Technology
      </footer>
    </div>
  );
}
