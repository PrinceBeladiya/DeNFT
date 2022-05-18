import { ethers } from 'ethers';

import NFT from '../contracts/contracts/DeNFT.sol/DeNFT.json';

export const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
export const signer = provider.getSigner();
export const DeNFTDeployedAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

export const DeNFTContract = new ethers.Contract(DeNFTDeployedAddress, NFT.abi, signer);