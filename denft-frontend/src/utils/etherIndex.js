import { ethers } from 'ethers';

import NFT from '../contracts/contracts/DeNFT.sol/DeNFT.json';
import MarketPlace from '../contracts/contracts/MarketPlace.sol/MarketPlace.json';
import FractionalERC721Factory from '../contracts/contracts/Fractional/FractionalERC721Factory.sol/FractionalERC721Factory.json';
import USDC from '../contracts/contracts/mock/USDC.sol/USDC.json';
import LendBorrow from '../contracts/contracts/LendBorrow/LendBorrow.sol/LendBorrow.json';
import { MUMBAI } from '../config/networks/Mumbai';
import { RINKEBY } from '../config/networks/Rinkeby';
import { METIS_STARDUST } from '../config/networks/MetisStardust';

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

export const Addresses = {
  [MUMBAI.chainId]: {
    deNFT: "0x096296D845C644C1F0E28Faa5857E8Da44F2939B",
    MarketPlace: "0x9cd45437BA040EDB1aaF4e62b310D7ea3826d327",
    fractionalERC721Factory: "0xD2FCA4248d9997311ccA5Ab87c99C6e207300fD1",
    usdc: "0x85467601037cD20084c6b5a2fBACA190e118f5cD",
    lendBorrow: "0x4aad9541F2bF4F12dd80637172A56E1129493cAA",
    decimal: 18,
    symbol: "MATIC",
  },
  [RINKEBY.chainId]: {
    deNFT: "0x06E13336da2DDe074762b9192c411e3d5790c610",
    MarketPlace: "0x8443E9b88736273dE08D57555254AFe3dC9EC962",
    fractionalERC721Factory: "0x836beBbC9a94Cabd57478DF22498863737c43a15",
    usdc: "0x9cD67aea8505773baD2A418A643AA1652c3a5703",
    lendBorrow: "0xB0f77d2113c612A69CbB0E0B10762A3B09F32Eb6",
    decimal: 18,
    symbol: "ETH",
  },
  [METIS_STARDUST.chainId]: {
    deNFT: "0xe6327338c5901bb6FfeB5c733601729683E8b6e5",
    MarketPlace: "0xA4FFEB0fF0c487f66f502668dDbCe8e3226BD1F9",
    fractionalERC721Factory: "0x8F952AaBCd86B1fAee1e6D11509e0C07Fae5173C",
    usdc: "0x615C1cd7729bCE1fD68f07c2B4eb2cA5aeEC1f7f",
    lendBorrow: "0x563Ea99f57072B443f669185509d0e734367772d",
    decimal: 18,
    symbol: "METIS",
  },
} 
