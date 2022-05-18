import React from 'react';
import Button from '@mui/material/Button';
import BlockUI from 'react-block-ui';
import GoogleLoader from '../GoogleLoader';
import DialogueContainer from './NFT-Dialog/dialogueContainer';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';

const NFTs = ({
    getdata,
    data,
    ID,
    sellForm,
    openForm,
    fractionalForm,
    updateNFTs,
    image
}) => {

    return (
        <div className="main-wrapper">
            <BlockUI
                blocking={getdata.transferableToken === ID}
                className="NFT-buttons"
                loader={<GoogleLoader height={20} width={20} />}
            >
                <Card sx={{ maxWidth: 345 }} className="card-container">
                    <CardActionArea className="card-child-container">
                        <CardMedia
                            component="img"
                            height="140"
                            image={image}
                            className="card-image"
                            alt="green iguana"
                        />
                        <CardContent className="description-container">
                            <Typography gutterBottom variant="h5" component="div" className="nft-site">
                                DeNFT
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div" className="nft-description">
                                NFT #{ID}
                            </Typography>
                            <hr />
                        </CardContent>
                    </CardActionArea>
                </Card>
                <div className='all-buttons'>
                    <Button
                        variant="contained"
                        className="mynft-button"
                        name={ID}
                        onClick={() => openForm(ID)} >
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
                    <Button
                        variant="contained"
                        className="fractional-button"
                        name={ID}
                        onClick={() => fractionalForm(ID)}
                    >
                        Fractional
                    </Button>
                </div>
                <DialogueContainer
                    data={getdata}
                    ID={ID}
                    sellForm={sellForm}
                    openForm={openForm}
                    updateNFTs={updateNFTs}
                />
            </BlockUI>
        </div>
    )
}

export default NFTs;