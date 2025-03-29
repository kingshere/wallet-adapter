import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";

function SignMessage() {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const { publicKey, signMessage } = useWallet();

  async function createSignature() {
    try {
      if (!publicKey) throw new Error("Wallet not connected!");
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");
      if (!message) throw new Error("Please enter a message to sign!");

      const encodedMessage = new TextEncoder().encode(message);
      const signatureBytes = await signMessage(encodedMessage);
      
      if (!ed25519.verify(signatureBytes, encodedMessage, publicKey.toBytes()))
        throw new Error("Message signature invalid!");
      
      const signatureBase58 = bs58.encode(signatureBytes);
      setSignature(signatureBase58);
    } catch (error) {
      alert("Error: " + error.message);
    }
  }
  
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "30px",
      padding: "15px",
      margin: "0 auto",
      maxWidth: "500px",
      width: "100%" 
    }}>
      <input
        type="text"
        placeholder="Enter message to sign"
        style={{ 
          fontSize: "18px", 
          letterSpacing: "0.5px",
          padding: "16px 20px",
          borderRadius: "10px",
          backgroundColor: "#374151",
          color: "#f3f4f6",
          border: "1px solid #4b5563",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
        }}
        onChange={(e) => setMessage(e.target.value)}
      />
      
      <button
        style={{ 
          fontSize: "18px", 
          letterSpacing: "0.5px",
          padding: "16px 20px",
          borderRadius: "10px",
          backgroundColor: "#8b5cf6",
          color: "#ffffff",
          border: "none",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          cursor: "pointer"
        }}
        onClick={createSignature}
      >
        Sign Message
      </button>
      
      {signature && (
        <div style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#1f2937",
          borderRadius: "8px",
          wordBreak: "break-all"
        }}>
          <p style={{ fontSize: "14px", color: "#d1d5db" }}>Signature:</p>
          <p style={{ fontSize: "16px", color: "#a5b4fc" }}>{signature}</p>
        </div>
      )}
    </div>
  );
}

export default SignMessage;
