import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState();

  async function requireAirdrop() {
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount.");
      return;
    }
    await connection.requestAirdrop(
      wallet.publicKey,
      amount * LAMPORTS_PER_SOL
    );
    alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
  }

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px",
      padding: "10px" 
    }}>
      <input
        type="number"
        placeholder="Enter amount"
        className="w-full px-6 py-4 mb-4 bg-zinc-700 text-zinc-200 border border-zinc-500 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
        style={{ 
          fontSize: "16px", 
          letterSpacing: "0.5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
        }}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button
        className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-zinc-200 font-semibold rounded-md transition duration-200"
        style={{ 
          fontSize: "16px", 
          letterSpacing: "0.5px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
        }}
        onClick={requireAirdrop}
      >
        Request Airdrop
      </button>
    </div>
  );
}

export default Airdrop;
