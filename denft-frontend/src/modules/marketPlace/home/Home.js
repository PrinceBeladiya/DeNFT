import React, { useEffect } from 'react';
import NFTContainer from '../../../shared/components/NFTComponent/NFTContainer';
import { DeNFTContract, MarketPlaceContract, web3Signer } from '../../../utils/etherIndex';

const Home = ({ data, getSellableNFTs }) => {

  return (
    <div className="marketplace-home-container">
      {
        data.SellableNFTs.map((token, index) => (
          <NFTContainer
            NFTID={token}
            index={index}
            getSellableNFTs={getSellableNFTs}
            NFTSellable={data.SellableNFTs}
            NFTSellableOwners={data.SellableNFTOwners}
            NFTSellablePrice={data.SellableNFTPrice}
          />
        ))
      }
    </div>
  )
}

export default Home;