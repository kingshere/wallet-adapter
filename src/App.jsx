import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// default styling
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./components/Airdrop";
import SolBalance from "./components/SolBalance";

const App = () => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-zinc-200 font-poppins" 
               style={{ padding: "40px 20px" }}>
            <div className="bg-zinc-800 p-12 rounded-lg shadow-lg w-full max-w-2xl" 
                 style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}>
              <h1 className="text-4xl font-bold mb-12 text-center text-zinc-100"
                  style={{ letterSpacing: "1px" }}>
                Solana Airdrop
              </h1>
              <div className="flex justify-center mb-10" style={{ gap: "20px" }}>
                <WalletMultiButton className="bg-zinc-700 hover:bg-zinc-600 text-sm font-semibold px-6 py-3 rounded-md" />
                <WalletDisconnectButton className="bg-zinc-700 hover:bg-zinc-600 text-sm font-semibold px-6 py-3 rounded-md" />
              </div>
              
              <div style={{ marginBottom: "40px" }}>
                <Airdrop />
              </div>
              
              <SolBalance />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
