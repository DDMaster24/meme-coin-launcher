"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #fef3c7, #fde68a, #fcd34d)",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#3b2f2f",
      fontFamily: "'Georgia', serif"
    }}>
      {/* Logo/Title */}
      <h1 style={{
        fontSize: "4rem",
        fontWeight: "bold",
        textShadow: "0 0 10px #fbbf24, 0 0 20px #f59e0b",
        textAlign: "center",
        marginBottom: "1rem",
      }}>
        🔥 Welcome to Meme Forge
      </h1>

      {/* Subheading */}
      <h2 style={{
        fontSize: "1.5rem",
        color: "#4b3a2f",
        marginBottom: "2rem",
        fontStyle: "italic"
      }}>
        The Easy Meme Coin Launcher
      </h2>

      {/* CTA */}
      <button
        onClick={() => router.push("/forge")}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          backgroundColor: "#f59e0b",
          border: "none",
          borderRadius: "12px",
          color: "white",
          fontWeight: "bold",
          boxShadow: "0 0 15px #f59e0b88",
          cursor: "pointer",
          transition: "transform 0.2s ease"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
      >
        🛠️ Forge Your Coin
      </button>

      {/* Info Text */}
      <div style={{ marginTop: "3rem", maxWidth: "600px", textAlign: "center", fontSize: "1rem" }}>
        <p>No coding required. No stress. Just meme magic.</p>
        <p>Launch your own custom meme token in seconds — safe, smooth, and powerful.</p>
      </div>
    </div>
  );
}
