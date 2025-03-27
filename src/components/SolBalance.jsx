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
      margin: "30px auto",
      padding: "25px",
      backgroundColor: "#2d3748",
      borderRadius: "12px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
      textAlign: "center",
      maxWidth: "90%",
      width: "450px"
    }}>
      <p style={{
        fontSize: "22px",
        fontWeight: "bold",
        color: "#90cdf4",
        margin: "10px 0",
        letterSpacing: "0.5px"
      }}>
        Sol Balance: <span style={{ color: "#68d391", marginLeft: "8px" }}>{solValue} SOL</span>
      </p>
    </div>
  );
}

export default SolBalance;
