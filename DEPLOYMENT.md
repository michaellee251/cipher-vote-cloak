# Cipher Vote Cloak - Deployment Guide

## Overview

This guide covers the deployment process for the Cipher Vote Cloak application, including smart contract deployment and frontend deployment to Vercel.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git configured
- Vercel account
- Wallet with Sepolia ETH for contract deployment

## Environment Setup

1. Copy the environment example file:
```bash
cp env.example .env
```

2. Update the `.env` file with your configuration:
```env
# WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Contract Address (will be filled after deployment)
VITE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# Network Configuration
VITE_CHAIN_ID=11155111

# IPFS Configuration
VITE_IPFS_GATEWAY=https://ipfs.io/ipfs/

# FHE Configuration
VITE_FHE_NETWORK_URL=https://api.zama.ai
```

## Smart Contract Deployment

### 1. Install Dependencies

```bash
npm install
```

### 2. Compile Contracts

```bash
npm run compile
```

### 3. Deploy to Sepolia

```bash
npm run deploy
```

### 4. Update Environment Variables

After deployment, update your `.env` file with the deployed contract address:

```env
VITE_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository

2. **Configure Environment Variables:**
   - In Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add the following variables:
     ```
     VITE_WALLETCONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
     VITE_CONTRACT_ADDRESS=0xYourDeployedContractAddress
     VITE_CHAIN_ID=11155111
     VITE_IPFS_GATEWAY=https://ipfs.io/ipfs/
     VITE_FHE_NETWORK_URL=https://api.zama.ai
     ```

3. **Deploy:**
   - Vercel will automatically deploy on every push to main branch
   - Or manually trigger deployment from the dashboard

### Option 2: Manual Build

1. **Build the application:**
```bash
npm run build
```

2. **Preview locally:**
```bash
npm run preview
```

3. **Deploy to any static hosting service:**
   - Upload the `dist` folder to your hosting provider
   - Ensure environment variables are configured

## Post-Deployment

### 1. Verify Contract Deployment

- Check the contract on Sepolia Etherscan
- Verify all functions are working correctly
- Test contract interactions

### 2. Test Frontend

- Connect wallet to the deployed application
- Test vote session creation
- Test voting functionality
- Verify FHE encryption is working

### 3. Update Documentation

- Update README with live deployment URL
- Document any custom configurations
- Add troubleshooting section if needed

## Troubleshooting

### Common Issues

1. **Contract deployment fails:**
   - Ensure you have enough Sepolia ETH
   - Check network configuration
   - Verify private key is correct

2. **Frontend build fails:**
   - Check all environment variables are set
   - Ensure all dependencies are installed
   - Check for TypeScript errors

3. **Wallet connection issues:**
   - Verify WalletConnect project ID
   - Check network configuration
   - Ensure contract address is correct

### Support

For issues and questions:
- Check the project documentation
- Review error logs in browser console
- Check Vercel deployment logs

## Security Considerations

- Never commit private keys to version control
- Use environment variables for sensitive data
- Regularly update dependencies
- Monitor contract for unusual activity
- Implement proper access controls

## Maintenance

- Monitor application performance
- Update dependencies regularly
- Backup important data
- Monitor contract events
- Keep documentation updated
