import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

function SendingSol() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const wallet = useWallet();
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  async function sendTokens() {
    try {
      if (!to || !amount || isNaN(amount)) {
        alert("Please enter valid recipient address and amount.");
        return;
      }
      
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      await wallet.sendTransaction(transaction, connection);
      alert("Sent " + amount + " SOL to " + to);
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
        placeholder="Recipient's public key"
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
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount to send"
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
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        style={{ 
          fontSize: "18px", 
          letterSpacing: "0.5px",
          padding: "16px 20px",
          borderRadius: "10px",
          backgroundColor: "#3b82f6",
          color: "#ffffff",
          border: "none",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          cursor: "pointer"
        }}
        onClick={sendTokens}
      >
        Send Tokens
      </button>
    </div>
  );
}

export default SendingSol;
