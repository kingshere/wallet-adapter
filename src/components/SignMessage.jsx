import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";

function SignMessage() {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { publicKey, signMessage } = useWallet();

  async function createSignature() {
    if (!publicKey) {
      setError("Please connect your wallet first");
      return;
    }
    
    if (!signMessage) {
      setError("Your wallet does not support message signing");
      return;
    }
    
    if (!message) {
      setError("Please enter a message to sign");
      return;
    }
    
    try {
      setIsLoading(true);
      setError("");
      setSignature("");
      
      const encodedMessage = new TextEncoder().encode(message);
      const signatureBytes = await signMessage(encodedMessage);
      
      // Verify the signature
      if (!ed25519.verify(signatureBytes, encodedMessage, publicKey.toBytes())) {
        throw new Error("Message signature verification failed");
      }
      
      const signatureBase58 = bs58.encode(signatureBytes);
      setSignature(signatureBase58);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px",
      padding: "10px",
      margin: "0 auto",
      maxWidth: "500px",
      width: "100%" 
    }}>
      <div style={{ position: "relative" }}>
        <textarea
          placeholder="Enter message to sign"
          value={message}
          style={{ 
            fontSize: "16px", 
            letterSpacing: "0.5px",
            padding: "16px 20px",
            borderRadius: "12px",
            backgroundColor: "#1f2937",
            color: "#f3f4f6",
            border: "1px solid #4b5563",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            width: "100%",
            minHeight: "100px",
            resize: "vertical",
            transition: "all 0.3s ease"
          }}
          onChange={(e) => setMessage(e.target.value)}
        />
        <label style={{
          position: "absolute",
          top: "-10px",
          left: "15px",
          backgroundColor: "#2d3748",
          padding: "0 8px",
          fontSize: "14px",
          color: "#9ca3af"
        }}>
          Message
        </label>
      </div>
      
      <button
        disabled={isLoading}
        style={{ 
          fontSize: "16px", 
          fontWeight: "600",
          letterSpacing: "0.5px",
          padding: "16px 20px",
          borderRadius: "12px",
          backgroundColor: isLoading ? "#4b5563" : "#8b5cf6",
          color: "#ffffff",
          border: "none",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          cursor: isLoading ? "not-allowed" : "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px"
        }}
        onClick={createSignature}
      >
        {isLoading ? "Signing..." : "Sign Message"}
      </button>
      
      {error && (
        <div style={{
          marginTop: "15px",
          padding: "15px",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          borderRadius: "8px",
          border: "1px solid #ef4444",
          color: "#fee2e2"
        }}>
          <p style={{ fontSize: "14px" }}>{error}</p>
        </div>
      )}
      
      {signature && (
        <div style={{
          marginTop: "15px",
          padding: "20px",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          borderRadius: "12px",
          border: "1px solid #10b981"
        }}>
          <p style={{ 
            fontSize: "14px", 
            fontWeight: "600",
            color: "#d1fae5",
            marginBottom: "10px"
          }}>
            Signature Generated Successfully
          </p>
          <div style={{
            backgroundColor: "#1f2937",
            padding: "15px",
            borderRadius: "8px",
            maxHeight: "120px",
            overflowY: "auto",
            wordBreak: "break-all"
          }}>
            <p style={{ fontSize: "14px", color: "#a5b4fc", fontFamily: "monospace" }}>{signature}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignMessage;
