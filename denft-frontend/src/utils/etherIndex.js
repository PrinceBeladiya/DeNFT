import { ethers } from 'ethers';

import NFT from '../contracts/contracts/DeNFT.sol/DeNFT.json';

export const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
export const signer = provider.getSigner();
export const DeNFTDeployedAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

export const DeNFTContract = new ethers.Contract(DeNFTDeployedAddress, NFT.abi, signer);