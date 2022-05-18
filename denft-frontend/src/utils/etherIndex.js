import { ethers } from 'ethers';

import NFT from '../contracts/contracts/DeNFT.sol/DeNFT.json';

export const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
export const signer = provider.getSigner();
export const DeNFTDeployedAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

export const DeNFTContract = new ethers.Contract(DeNFTDeployedAddress, NFT.abi, signer);