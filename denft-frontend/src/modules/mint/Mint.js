import React, { useEffect, useState } from 'react';
import { DeNFTContract } from '../../utils/etherIndex';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { ethers } from 'ethereum-waffle/node_modules/ethers';
import { withRouter } from 'react-router';

import NFTImage from '../../assets/images/thumb-1920-961795.jpg';

const Mint = ({ history }) => {

  const [CurrentTokenID, setCurrentTokenID] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const tokens = await DeNFTContract.functions.tokenId();
      setCurrentTokenID(Number(tokens));
    }
    getToken();
    
  }, [loading]);

  const mintNFT = async () => {
    setLoading(true);
    try {
      const { ethereum } = window;

      if(!ethereum) {
        toast.warning("Please first install metamask");
        return;
      }

      await window.ethereum.enable();
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      let signer1 = await provider.getSigner();
      
      await DeNFTContract.connect(signer1).functions.mint({ value: ethers.utils.parseEther("0.1") } );

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      let mintTokenOwner = await DeNFTContract.functions.ownerOf(CurrentTokenID);
    
      if (toString(mintTokenOwner[0]) === toString(accounts[0])) {
        setLoading(false);
        toast.success("NFT with token id " + CurrentTokenID + " is minted for you", { autoClose: 2000 });
      } else {
        setLoading(false);
        toast.warning("NFT with token id " + CurrentTokenID + " is can not minted for you", { autoClose: 2000 });
      }
    } catch (error) {
      setLoading(false);
      console.log("error => ", error);
    }

  }

  return (
    <div className="mint-container">
      <div className="nft-mint-wrapper">
        <div className="nft-details-wrapper">
          <div className="nft-details">
            <div className="nft-title">DeNFT #{CurrentTokenID}</div>
            <div className="nft-description">1000 unique NFTs from the DeNFT</div>
            <div className="price-wrapper">
              <div className="price-label">Price</div>
              <div className="price-value">0.1 ETH</div>
            </div>
            <div className="mint-btn-wrapper">
              <Button
                onClick={mintNFT}
                className="mint-btn"
                variant='contained'
              >
                <div>Mint</div>
              </Button>
            </div>
            <div className="buy-crypto-wrapper">
              <div
                className="buy-crypto-link"
                role="presentation"
                onClick={ () => history.push("/buy-crypto") }
              >
                Don't have enough crypto? click here!
              </div>
            </div>
          </div>
        </div>
        <div className="nft-image">
          <img src={NFTImage} alt="nft-img" />
        </div>
      </div>
    </div>
  )
};

export default withRouter(Mint);