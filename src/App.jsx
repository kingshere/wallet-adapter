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

  // Add this style to center the wallet modal
  React.useEffect(() => {
    // Add CSS to center the wallet modal
    const style = document.createElement('style');
    style.textContent = `
      .wallet-adapter-modal {
        margin: 0 auto !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* Banner heading at the top */}
          <div className="banner" style={{
            backgroundColor: "#4c1d95", 
            padding: "25px 0",
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 100,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
          }}>
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              textAlign: "center",
              color: "#f3f4f6",
              margin: 0,
              letterSpacing: "2px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)"
            }}>
              Solana Airdrop
            </h1>
          </div>

          <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-zinc-200 font-poppins" 
               style={{ 
                 padding: "120px 250px 40px",
                 display: "flex",
                 flexDirection: "column",
                 justifyContent: "center",
                 alignItems: "center",
                 width: "100%"
               }}>
            <div className="bg-zinc-800 p-12 rounded-lg shadow-lg w-full max-w-2xl" 
                 style={{ 
                   boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                   margin: "0 auto",
                   maxWidth: "800px",
                   display: "flex",
                   flexDirection: "column",
                   alignItems: "center"  // Center all children horizontally
                 }}>
              
              {/* Enlarged wallet buttons with more space */}
              <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                gap: "30px",
                margin: "30px 0 50px",
                width: "100%" // Ensure full width of parent
              }}>
                <WalletMultiButton style={{
                  fontSize: "18px",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  backgroundColor: "#6366f1",
                  transition: "all 0.3s ease"
                }} />
                
                <WalletDisconnectButton style={{
                  fontSize: "18px",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  backgroundColor: "#6366f1",
                  transition: "all 0.3s ease"
                }} />
              </div>
              
              <div style={{ marginBottom: "50px" }}>
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
