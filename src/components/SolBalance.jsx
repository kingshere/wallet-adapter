import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

function SolBalance() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [solValue, setSolValue] = useState(0);

  useEffect(() => {
    async function fetchBalance() {
      if (wallet.publicKey) {
        const value = await connection.getBalance(wallet.publicKey);
        setSolValue(value / LAMPORTS_PER_SOL);
      }
    }

    fetchBalance();
  }, [wallet.publicKey, connection]);

  return (
    <div className="balance-container" style={{
      margin: "20px 0",
      padding: "15px",
      backgroundColor: "#2d3748",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      textAlign: "center"
    }}>
      <p style={{
        fontSize: "18px",
        fontWeight: "bold",
        color: "#90cdf4",
        margin: "0"
      }}>
        Sol Balance: <span style={{ color: "#68d391" }}>{solValue} SOL</span>
      </p>
    </div>
  );
}

export default SolBalance;
