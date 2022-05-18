import React, { useEffect } from 'react';
import { DeNFTContract } from '../../utils/etherIndex';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone'
import BlockUI from 'react-block-ui';
import GoogleLoader from '../../shared/components/GoogleLoader';

const Mint = ({ history, CurrentTokenID, setCurrentTokenID, loading, mintNFT, setImage, files, setFiles }) => {

  useEffect(() => {
    const getToken = async () => {

      const tokens = await DeNFTContract.functions.totalTokens();
      setCurrentTokenID(Number(tokens));
    }
    getToken();

  }, [loading]);

  const onImageChange = (file) => {

    console.log("file - ", file);
    console.log("length - ", file.length);
    if (file.length > 0) {
      setImage(file[0]);

      setFiles(file.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));

    } else {
      toast.warning("Please select file", { autoClose: 2000 });
      return;
    }

  };

  return (
    <div className="mint-container">
      <div className="nft-mint-wrapper">
        {/* <BlockUI
          tag="div"
          blocking={true}
          className="full-height"
          loader={<GoogleLoader height={25} width={30} />}
        > */}
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
                onClick={() => history.push("/buy-crypto")}
              >
                Don't have enough crypto? click here!
              </div>
            </div>
          </div>
        </div>
        <div className="imageUpload">
          <div className='image-View'>
            {
              files.length > 0 && files[0].preview ?
                <img src={files[0].preview} alt="NFT" className='image-uploaded' />
                :
                ''
            }
          </div>
          <Dropzone
            onDrop={acceptedFiles => onImageChange(acceptedFiles)}
            accept={'image/*'}
            multiple={false}
          >

            {({ getRootProps, getInputProps }) => (
              <div className='button-view' {...getRootProps()}>
                <input {...getInputProps()} />
                {
                  files.length > 0 && files[0].preview ?
                    ''
                    :
                    <label className="upload-button" for="upload"><p className='instruction'>Drag 'n' drop some files here, or click to select files</p></label>
                }
              </div>
            )}

          </Dropzone>
        </div>
        {/* </BlockUI> */}
      </div>
    </div>
  )
};

export default withRouter(Mint);