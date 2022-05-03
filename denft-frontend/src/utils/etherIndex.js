import { ethers } from 'ethers';

import NFT from '../contracts/contracts/DeNFT.sol/DeNFT.json';

export const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
export const signer = provider.getSigner();
export const DeNFTDeployedAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const DeNFTContract = new ethers.Contract(DeNFTDeployedAddress, NFT.abi, signer);