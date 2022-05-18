import { ethers } from 'ethers';

import NFT from '../contracts/contracts/DeNFT.sol/DeNFT.json';
import MarketPlace from '../contracts/contracts/MarketPlace.sol/MarketPlace.json';

export const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
export const signer = provider.getSigner();

export const Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
export const web3Signer = Web3Provider.getSigner();

export const DeNFTDeployedAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const MarketPlaceDeployedAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const DeNFTContract = new ethers.Contract(DeNFTDeployedAddress, NFT.abi, signer);
export const MarketPlaceContract = new ethers.Contract(MarketPlaceDeployedAddress, MarketPlace.abi, signer);