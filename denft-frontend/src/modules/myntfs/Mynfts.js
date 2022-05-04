import React, { useEffect } from 'react';
import { DeNFTContract } from '../../utils/etherIndex';
import Button from '@mui/material/Button';
import BlockUI from 'react-block-ui';
import GoogleLoader from '../../shared/components/GoogleLoader';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert } from '@mui/material';

const Mynfts = (props) => {

  const {
    getdata,
    updatedata,
    loading,
    setLoading,
    open,
    setOpen,
    transferableToken,
    setTransferableToken,
    receipientAddress,
    setReceipientAddress,
    tokens,
    setTokens,
    accounts,
    setAccounts
  } = props;

  useEffect(() => {
    const { ethereum } = window;

    if (!ethereum) {
      toast.warning("Please first install metamask");
      return;
    }

    ethereum.on('accountsChanged',async () => {
      const address = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if(accounts[0] !== address[0]) {
        getOwnerTokens();
        setAccounts(address[0]);
      }
    })
    
    const getOwnerTokens = async () => {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccounts(accounts);
      const tokensOfOwner = await DeNFTContract.functions.allTokens(accounts[0]);
      const tokenIDs = tokensOfOwner[0].map(token => {
        return Number(token);
      });

      setTokens(tokenIDs);
      updatedata({
        address: accounts[0],
        NFTList: tokens
      });
    }
    getOwnerTokens();
  }, []);

  const transferNFT = async (e) => {
    closeForm();
    setLoading(true);

    try {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      let signer1 = provider.getSigner();

      await DeNFTContract.connect(signer1).transfer(ethers.utils.getAddress(receipientAddress), transferableToken);

      let transfereTokenOwner = await DeNFTContract.functions.ownerOf(transferableToken);

      if (receipientAddress === transfereTokenOwner[0]) {
        setLoading(false);
        toast.success("Your NFT is successfully transfered", { autoClose: 2000 });
      } else {
        setLoading(false);
        toast.warning("Your NFT is not successfully transfered", { autoClose: 2000 });
      }

      const tokensOfOwner = await DeNFTContract.functions.allTokens(accounts[0]);
      const tokenIDs = tokensOfOwner[0].map(token => {
        return Number(token);
      });

      setTokens(tokenIDs);

    } catch (error) {
      setLoading(false);
      toast.warning(error.data.message, { autoClose: 2000 });
    }
  };

  const openForm = (e) => {
    setOpen(true);
    setTransferableToken(e.target.name);
  }

  const closeForm = () => {
    setOpen(false);
  }

  const handleAddress = (e) => {
    setReceipientAddress(e.target.value);
  }

  return (
    <div className='header-container'>
      <div className='header'>
        <h1 className='header-mynft'>My NFTs</h1>
        <hr />
      </div>
      <div className='main-container-mynft'>
        {
          getdata({
            address: accounts[0],
            NFTList: tokens
          }).payload.NFTList.length === 0 ?
            <Alert className='alert' severity="error">
              {
                getdata({
                  address: accounts[0],
                  NFTList: tokens
                }).payload.address === 'undefined' || getdata({
                  address: accounts[0],
                  NFTList: tokens
                }).payload.address === '' ?
                  'Please connect with metamask' : 'You dont have any NFTs'
              }
            </Alert>
            :
            getdata({
              address: accounts[0],
              NFTList: tokens
            }).payload.NFTList.map(token => (
              <div className='contents-wrappers'>
                <div className="wrapper-mynft">
                  <div className="container-mynft">
                    <div className="top-mynft"></div>
                    <div className="bottom-mynft">
                      <div className="details-mynft">
                        <h3>NFT #{token}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='wrapper2'>
                  <BlockUI
                    blocking={loading}
                    className="full-height"
                    loader={<GoogleLoader height={20} width={20} />}
                  >
                    <Button variant="contained" className="mint-button" name={token} onClick={openForm} >
                      Transfer
                    </Button>
                  </BlockUI>
                  <Dialog open={open} onClose={closeForm}>
                    <DialogTitle>Transfer NFT #{transferableToken}</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Receipient Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleAddress}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={closeForm}>Cancel</Button>
                      <Button onClick={transferNFT}>Transfer</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default Mynfts;