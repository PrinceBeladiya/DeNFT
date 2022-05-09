import React, { useEffect } from 'react';
import { DeNFTContract } from '../../utils/etherIndex';
import { toast } from 'react-toastify';
import NFTContainer from '../../shared/components/NFTComponent/NFTContainer';

const Mynfts = (props) => {

  const {
    getdata,
    data,
    updateNFTs,
    updateAccount,
  } = props;

  useEffect(() => {
    const { ethereum } = window;

    if (!ethereum) {
      toast.warning("Please first install metamask");
      return;
    }

    ethereum.on('accountsChanged', async () => {
      const address = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (data.account !== address[0]) {
        getOwnerTokens();
        updateAccount(address[0]);
      }
    })

    const getOwnerTokens = async () => {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      updateAccount(accounts[0]);
      const tokensOfOwner = await DeNFTContract.functions.allTokens(accounts[0]);
      const tokenIDs = tokensOfOwner[0].map(token => {
        return Number(token);
      });

      updateNFTs(tokenIDs);
    }
    getOwnerTokens();
  }, []);


  return (
    <div className='header-container'>
      <div className='header'>
        <h1 className='header-mynft'>My NFTs</h1>
        <hr />
      </div>
      <div className='main-container-mynft'>
        {
          getdata.NFTList.map(token => (
            <NFTContainer
              updateNFTs={updateNFTs}
              NFTID={token}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Mynfts;