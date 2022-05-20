import { ethers } from 'ethers';

import NFT from '../contracts/contracts/DeNFT.sol/DeNFT.json';
import MarketPlace from '../contracts/contracts/MarketPlace.sol/MarketPlace.json';
import FractionalERC721Factory from '../contracts/contracts/Fractional/FractionalERC721Factory.sol/FractionalERC721Factory.json';
import USDC from '../contracts/contracts/mock/USDC.sol/USDC.json';
import LendBorrow from '../contracts/contracts/LendBorrow/LendBorrow.sol/LendBorrow.json';

export const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
export const signer = provider.getSigner();

export const Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
export const web3Signer = Web3Provider.getSigner();

export const DeNFTDeployedAddress = "0xFD471836031dc5108809D173A067e8486B9047A3";
export const MarketPlaceDeployedAddress = "0xcbEAF3BDe82155F56486Fb5a1072cb8baAf547cc";
export const FractionalERC721FactoryDeployedAddress = "0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f";
export const USDCDeployedAddress = "0xB0D4afd8879eD9F52b28595d31B441D079B2Ca07";
export const LendBorrowDeployedAddress = "0x162A433068F51e18b7d13932F27e66a3f99E6890";

export const DeNFTContract = new ethers.Contract(DeNFTDeployedAddress, NFT.abi, signer);
export const MarketPlaceContract = new ethers.Contract(MarketPlaceDeployedAddress, MarketPlace.abi, signer);
export const FractionalERC721FactoryContract = new ethers.Contract(FractionalERC721FactoryDeployedAddress, FractionalERC721Factory.abi, signer);
export const USDCContract = new ethers.Contract(USDCDeployedAddress, USDC.abi, signer);
export const LendBorrowContract = new ethers.Contract(LendBorrowDeployedAddress, LendBorrow.abi, signer);