
# Solana Wallet Adapter

A modern React application that demonstrates integration with the Solana blockchain using the Solana Wallet Adapter. This project provides a comprehensive interface for connecting to Solana wallets, viewing balances, requesting airdrops, sending SOL, and signing messages.

## Features

- **Wallet Connection**: Connect to various Solana wallets using the Wallet Adapter
- **Balance Checking**: View your SOL balance in real-time
- **Airdrop Functionality**: Request SOL airdrops on devnet for testing
- **Token Transfer**: Send SOL to other wallet addresses
- **Message Signing**: Sign messages using your Solana wallet
- **Responsive Design**: Clean, modern UI that works on various screen sizes

## Technologies Used

- React 18
- Vite
- Solana Web3.js
- Solana Wallet Adapter
- Noble Curves (for cryptographic operations)
- BS58 (for encoding/decoding)

## Screenshot

![Solana Airdrop Application](./src/assets/screencapture-localhost-5173-2025-03-30-02_09_24.png)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Solana wallet (Phantom, Solflare, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/wallet-adapter.git
cd wallet-adapter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Connecting a Wallet

1. Click the "Select Wallet" button
2. Choose your preferred wallet from the modal
3. Approve the connection request in your wallet

### Checking Balance

Once connected, your SOL balance will automatically display in the SOL Balance card.

### Requesting an Airdrop

1. Enter the amount of SOL you want to request in the Request Airdrop card
2. Click "Request Airdrop"
3. Wait for the transaction to complete

### Sending SOL

1. Enter the recipient's public key in the Send SOL card
2. Enter the amount of SOL to send
3. Click "Send SOL"
4. Approve the transaction in your wallet

### Signing Messages

1. Enter a message in the input field in the Sign Message card
2. Click "Sign Message"
3. Approve the signing request in your wallet
4. View the generated signature








