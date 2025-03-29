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
// Import the new components
import SendingSol from "./components/SendingSol";
import SignMessage from "./components/SignMessage";

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

          <div className="min-h-screen bg-zinc-900 text-zinc-200 font-poppins" 
               style={{ 
                 padding: "120px 40px 40px",
                 width: "100%"
               }}>
            
            {/* Wallet connection buttons at the top */}
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              gap: "30px",
              margin: "0 auto 50px",
              maxWidth: "500px"
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
            
            {/* Grid layout for the four main components */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "120px",  // Increased from 40px to 60px
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "50px 50px"  // Added horizontal padding
            }}>
              {/* Airdrop Component */}
              <div style={{ 
                backgroundColor: "#2d3748",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                border: "1px solid #4a5568",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}>
                <h2 style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#90cdf4",
                  marginBottom: "25px",
                  textAlign: "center",
                  letterSpacing: "0.5px"
                }}>
                  Request Airdrop
                </h2>
                <Airdrop />
              </div>
              
              {/* Send SOL Component */}
              <div style={{ 
                backgroundColor: "#2d3748",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                border: "1px solid #4a5568",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}>
                <h2 style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#90cdf4",
                  marginBottom: "25px",
                  textAlign: "center",
                  letterSpacing: "0.5px"
                }}>
                  Send SOL
                </h2>
                <SendingSol />
              </div>
              
              {/* Sign Message Component */}
              <div style={{ 
                backgroundColor: "#2d3748",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                border: "1px solid #4a5568",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}>
                <h2 style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#90cdf4",
                  marginBottom: "25px",
                  textAlign: "center",
                  letterSpacing: "0.5px"
                }}>
                  Sign Message
                </h2>
                <SignMessage />
              </div>
              
              {/* SOL Balance Component */}
              <div style={{ 
                backgroundColor: "#2d3748",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                border: "1px solid #4a5568",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                <h2 style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#90cdf4",
                  marginBottom: "25px",
                  textAlign: "center",
                  letterSpacing: "0.5px"
                }}>
                  SOL Balance
                </h2>
                <SolBalance />
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
