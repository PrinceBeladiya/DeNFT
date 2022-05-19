import React, { useEffect } from 'react';
import Home from './Home';
import { updateSellableNFTOwners, updateSellableNFTPrice, updateSellableNFTs } from '../redux/actions';
import { connect } from 'react-redux';
import { DeNFTContract, MarketPlaceContract, web3Signer } from '../../../utils/etherIndex';

const HomeContainer = ({ data, updateSellableNFTTokens, updateSellableNFTTokensOwners, updateSellableNFTTokensPrice }) => {

  useEffect ( () => {
    // const { ethereum } = window;
    getSellableNFTs();
    // await MarketPlaceContract.connect(web3Signer).addCollection(MarketPlaceContract.address, ethereum.selectedAddress);
  }, []);

  const getSellableNFTs = async () => {
    try {
      // console.log("CAlled");
      const tokens = await DeNFTContract.functions.totalTokens();
      // console.log("sellableTokens ----- ", tokens);
      const sellableTokens = await MarketPlaceContract.connect(web3Signer).viewAsksByCollection(DeNFTContract.address, 0, tokens);
      // console.log("sellableTokens ----- ", tokens);
      // console.log("sellableTokens ----- ", sellableTokens);

      let NFTSellable = [];
      let NFTSellableOwners = [];
      let NFTSellablePrice = [];

      for (let i = 0; i < sellableTokens[0].length; i++) {
        NFTSellable[i] = Number(sellableTokens[0][i]);
        NFTSellableOwners[i] = sellableTokens.askInfo[i][0];
        NFTSellablePrice[i] = Number(sellableTokens.askInfo[i].price);
      }

      updateSellableNFTTokens(NFTSellable);
      updateSellableNFTTokensOwners(NFTSellableOwners);
      updateSellableNFTTokensPrice(NFTSellablePrice);
      // console.log("sellableTokens -> ", sellableTokens);
      // console.log("NFTSellable 2 -> ", NFTSellable);
      // console.log("NFTSellableOwners 3 -> ", NFTSellableOwners);
      // console.log("NFTSellablePrice 4 -> ", NFTSellablePrice);
    } catch (error) {
      console.log("Error -> ", error);
    }
  }

  return (
    <Home
      data={data}
      getSellableNFTs={getSellableNFTs}
    />
  )
}

const mapStateToProps = state => ({
  data : state.home,

});

const mapDispatchToProps = dispatch => ({
  updateSellableNFTTokens: token => dispatch(updateSellableNFTs(token)),
  updateSellableNFTTokensOwners: token => dispatch(updateSellableNFTOwners(token)),
  updateSellableNFTTokensPrice: token => dispatch(updateSellableNFTPrice(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
