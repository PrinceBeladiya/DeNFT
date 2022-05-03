import React, { useEffect, useState } from 'react';
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
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, AlertTitle } from '@mui/material';

const Mynfts = () => {

  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [transferableToken, setTransferableToken] = useState('');
  const [receipientAddress, setReceipientAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const { ethereum } = window;

    if (!ethereum) {
      toast.warning("Please first install metamask");
      return;
    }

    const getOwnerTokens = async () => {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const tokensOfOwner = await DeNFTContract.functions.allTokens(accounts[0]);
      const tokenIDs = tokensOfOwner[0].map(token => {
        return Number(token);
      });

      setTokens(tokenIDs);
    }
    getOwnerTokens();
  }, []);

  const transferNFT = async (e) => {
    closeForm();
    setLoading(true);

    try {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      let signer1 = await provider.getSigner();

      await DeNFTContract.connect(signer1).transfer(ethers.utils.getAddress(receipientAddress), transferableToken);

      let transfereTokenOwner = await DeNFTContract.functions.ownerOf(transferableToken);

      if (receipientAddress === transfereTokenOwner[0]) {
        setLoading(false);
        toast.success("Your NFT is successfully transfered", { autoClose: 2000 });
      } else {
        setLoading(false);
        toast.warning("Your NFT is not successfully transfered", { autoClose: 2000 });
      }

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
    <div className='main-container-mynft'>
      {
        tokens.map(token => (
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
                  <DialogContentText>
                    To transfer the NFT token please provide address of the recepient.
                  </DialogContentText>
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
  )
}

export default Mynfts;