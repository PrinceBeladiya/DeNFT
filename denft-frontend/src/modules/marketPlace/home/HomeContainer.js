import React, { useEffect } from 'react';
import Home from './Home';
import { updateMenu, updateSellableNFTOwners, updateSellableNFTPrice, updateSellableNFTs } from '../redux/actions';
import { connect } from 'react-redux';
import { DeNFTContract, MarketPlaceContract, web3Signer } from '../../../utils/etherIndex';

const HomeContainer = ({ data, changeMenu, updateSellableNFTTokens, updateSellableNFTTokensOwners, updateSellableNFTTokensPrice }) => {

  useEffect ( () => {
    changeMenu("Home");
    
    getSellableNFTs();
  }, []);

  const getSellableNFTs = async () => {
    try {
      const tokens = await DeNFTContract.functions.totalTokens();
      const sellableTokens = await MarketPlaceContract.connect(web3Signer).viewAsksByCollection(DeNFTContract.address, 0, tokens);

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
  changeMenu: data => dispatch(updateMenu(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
