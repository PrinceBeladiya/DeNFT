import { ethers } from 'ethers';

import NFT from '../contracts/contracts/DeNFT.sol/DeNFT.json';
import MarketPlace from '../contracts/contracts/MarketPlace.sol/MarketPlace.json';
import FractionalERC721Factory from '../contracts/contracts/Fractional/FractionalERC721Factory.sol/FractionalERC721Factory.json';

export const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
export const signer = provider.getSigner();

export const Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
export const web3Signer = Web3Provider.getSigner();

export const DeNFTDeployedAddress = "0xb7278A61aa25c888815aFC32Ad3cC52fF24fE575";
export const MarketPlaceDeployedAddress = "0xCD8a1C3ba11CF5ECfa6267617243239504a98d90";
export const FractionalERC721FactoryDeployedAddress = "0x82e01223d51Eb87e16A03E24687EDF0F294da6f1";

export const DeNFTContract = new ethers.Contract(DeNFTDeployedAddress, NFT.abi, signer);
export const MarketPlaceContract = new ethers.Contract(MarketPlaceDeployedAddress, MarketPlace.abi, signer);
export const FractionalERC721FactoryContract = new ethers.Contract(FractionalERC721FactoryDeployedAddress, FractionalERC721Factory.abi, signer);