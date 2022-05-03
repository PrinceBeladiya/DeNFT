import React, { useEffect, useState } from 'react';
import { DeNFTContract } from '../../utils/etherIndex';
import Button from '@mui/material/Button';
import BlockUI from 'react-block-ui';
import GoogleLoader from '../../shared/components/GoogleLoader';
import { toast } from 'react-toastify';
import { ethers } from 'ethereum-waffle/node_modules/ethers';

const Mint = () => {

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
    <div className="main-container">

      <div className="wrapper">
        <div className="container">
          <div className="top"></div>
          <div className="bottom">
            <div className="left">
              <div className="details">
                <h3>NFT #{CurrentTokenID}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='notes'>
        <div className='price-description'>
          <p>Price</p>
          <p>0.1 ether</p>
        </div>
      </div>
      <div className='wrapper2'>
        <BlockUI
          blocking={loading}
          className="full-height"
          loader={<GoogleLoader height={20} width={20} />}
        >
          <Button variant="contained" className="mint-button" onClick={mintNFT} >
              MINT
          </Button>
        </BlockUI>
      </div>

    </div >
  )
};

export default Mint;