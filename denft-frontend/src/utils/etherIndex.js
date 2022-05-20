import { ethers } from 'ethers';

import NFT from '../contracts/contracts/DeNFT.sol/DeNFT.json';
import MarketPlace from '../contracts/contracts/MarketPlace.sol/MarketPlace.json';
import FractionalERC721Factory from '../contracts/contracts/Fractional/FractionalERC721Factory.sol/FractionalERC721Factory.json';
import { MUMBAI } from '../config/networks/Mumbai';
import { RINKEBY } from '../config/networks/Rinkeby';
import { METIS_STARDUST } from '../config/networks/MetisStardust';

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

export const Addresses = {
  [MUMBAI.chainId]: {
    deNFT: "0x76E20606Ce9a68f31e290988e8158Eeceb1c7d46",
    MarketPlace: "0xee31028334b88DCC37812fc42Ee71d2506c199C2",
    fractionalERC721Factory: "0xE187Bb3c9bc7047a5aF000a56732b66b8b3Cf79f",
    usdc: "0xfdF369d4B7bd4b116A5E5977A28c84e73a6aB371",
    lendBorrow: "0x4c7c5f1D931946F8Aa027d40b33B070535CF44aa",
    decimal: 18,
    symbol: "MATIC",
  },
  [RINKEBY.chainId]: {
    deNFT: "0xf720C992AB2749384ac5a43a603F76b9dcD1cbe9",
    MarketPlace: "0x6652bDFFeb821A2e470be83e60fEff860d2a6Cac",
    fractionalERC721Factory: "0x4d2B863817ca23FeF30d9c265391527f08E9c8b9",
    usdc: "0x3Fe7fF7B25fB31AEEdE3530d9532CAB0b5717bbE",
    lendBorrow: "0x9Bab12626Ed5290DB9B66b0573e03c305D194C53",
    decimal: 18,
    symbol: "ETH",
  },
  [METIS_STARDUST.chainId]: {
    deNFT: "0x88aF30fB5C4b35ae3f038462e00cF97b306e4d6F",
    MarketPlace: "0x9030cd0360448306cc5b02EBd3B52E87DA2673b7",
    fractionalERC721Factory: "0xaC28ff29342f0Da8a31eC36dE966a59788beECdD",
    usdc: "0x62B7583165A401D18Aa78a2d9446208eCF1527C3",
    lendBorrow: "0x79319110b54a281267e8f68a1c8dc3107af01373",
    decimal: 18,
    symbol: "ETH",
  },
} 