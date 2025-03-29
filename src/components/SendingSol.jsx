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
  const [isLoading, setIsLoading] = useState(false);
  const [txStatus, setTxStatus] = useState(null);
  const wallet = useWallet();
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  async function sendTokens() {
    if (!publicKey) {
      setTxStatus({ success: false, message: "Please connect your wallet first" });
      return;
    }
    
    if (!to || !amount || isNaN(amount)) {
      setTxStatus({ success: false, message: "Please enter valid recipient address and amount" });
      return;
    }
    
    try {
      setIsLoading(true);
      setTxStatus(null);
      
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      
      setTxStatus({ 
        success: true, 
        message: `Transaction successful! Sent ${amount} SOL to ${to.slice(0, 4)}...${to.slice(-4)}`,
        signature
      });
      
      // Clear form
      setTo("");
      setAmount("");
    } catch (error) {
      setTxStatus({ success: false, message: `Error: ${error.message}` });
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
        <input
          type="text"
          placeholder="Recipient's public key"
          value={to}
          style={{ 
            fontSize: "16px", 
            letterSpacing: "0.5px",
            padding: "20px 3px",
            borderRadius: "12px",
            backgroundColor: "#1f2937",
            color: "#f3f4f6",
            border: "1px solid #4b5563",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            width: "100%",
            transition: "all 0.3s ease"
          }}
          onChange={(e) => setTo(e.target.value)}
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
          Recipient
        </label>
      </div>
      
      <div style={{ position: "relative" }}>
        <input
          type="number"
          placeholder="Amount to send"
          value={amount}
          style={{ 
            fontSize: "16px", 
            letterSpacing: "0.5px",
            padding: "20px 3px",
            borderRadius: "12px",
            backgroundColor: "#1f2937",
            color: "#f3f4f6",
            border: "1px solid #4b5563",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            width: "100%",
            transition: "all 0.3s ease"
          }}
          onChange={(e) => setAmount(e.target.value)}
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
          Amount (SOL)
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
          backgroundColor: isLoading ? "#4b5563" : "#3b82f6",
          color: "#ffffff",
          border: "none",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          cursor: isLoading ? "not-allowed" : "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px"
        }}
        onClick={sendTokens}
      >
        {isLoading ? "Processing..." : "Send SOL"}
      </button>
      
      {txStatus && (
        <div style={{
          marginTop: "15px",
          padding: "15px",
          backgroundColor: txStatus.success ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
          borderRadius: "8px",
          border: `1px solid ${txStatus.success ? "#10b981" : "#ef4444"}`,
          color: txStatus.success ? "#d1fae5" : "#fee2e2"
        }}>
          <p style={{ fontSize: "14px" }}>{txStatus.message}</p>
          {txStatus.success && txStatus.signature && (
            <p style={{ 
              fontSize: "12px", 
              marginTop: "8px",
              wordBreak: "break-all",
              color: "#9ca3af"
            }}>
              Signature: {txStatus.signature}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SendingSol;
