import React from 'react';
import Button from '@mui/material/Button';
import BlockUI from 'react-block-ui';
import GoogleLoader from '../GoogleLoader';
import DialogueContainer from './NFT-Dialog/dialogueContainer';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import image from '../../../assets/images/thumb-1920-961795.jpg';

const NFTs = ({
    getdata,
    ID,
    sellForm,
    openForm,
    updateNFTs
}) => {

    return (
        <BlockUI
            blocking={getdata.transferableToken === ID}
            className="NFT-buttons"
            loader={<GoogleLoader height={20} width={20} />}
        >
            {/* <div className='contents-wrappers'>
                <div className="wrapper-mynft">
                    <div className="container-mynft">
                        <div className="top-mynft"></div>
                        <div className="bottom-mynft">
                            <div className="details-mynft">
                                <h3>NFT #{ID}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='buttons'>

                    <Button variant="contained" className="mint-button" name={ID} onClick={() => openForm(ID)} >
                        Transfer
                    </Button>
                    <Button
                        variant="contained"
                        className="mint-button"
                        name={ID}
                        onClick={() => sellForm(ID)}
                    >
                        Sell
                    </Button>
                    <DialogueContainer
                        getdata={getdata}
                        data={getdata}
                        ID={ID}
                        sellForm={sellForm}
                        openForm={openForm}
                        updateNFTs={updateNFTs}
                    />
                </div>
            </div> */}

            <Card sx={{ maxWidth: 345 }} className="card-container">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        className="card-image"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className="nft-description">
                            NFT #{ID}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Button variant="contained" className="mynft-button" name={ID} onClick={() => openForm(ID)} >
                Transfer
            </Button>
            <Button
                variant="contained"
                className="mynft-button"
                name={ID}
                onClick={() => sellForm(ID)}
            >
                Sell
            </Button>
            <DialogueContainer
                getdata={getdata}
                data={getdata}
                ID={ID}
                sellForm={sellForm}
                openForm={openForm}
                updateNFTs={updateNFTs}
            />
        </BlockUI>
    )
}

export default NFTs;