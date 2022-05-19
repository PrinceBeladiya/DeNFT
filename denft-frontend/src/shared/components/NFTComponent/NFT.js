import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import BlockUI from 'react-block-ui';
import GoogleLoader from '../GoogleLoader';
import DialogueContainer from './NFT-Dialog/dialogueContainer';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { ethers } from 'ethers';

const NFTs = ({
    getdata,
    data,
    dashboard,
    NFTSellable = [],
    NFTSellableOwners = [],
    NFTSellablePrice = [],
    ID,
    sellForm,
    openForm,
    fractionalForm,
    updateNFTs,
    image,
    index,
    cancelSellableNFT,
    buySellableNFT,
}) => {

    return (
        <div className="main-wrapper">
            {/* {console.log("index -> ", index)}
            {console.log("id -> ", ID)}
            {console.log("id array from redux -> ", NFTSellable)} */}
            <BlockUI
                blocking={getdata.transferableToken === ID}
                className="NFT-container"
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
                            {/* {
                                NFTSellablePrice.length > 0 && NFTSellableOwners.length > 0 && NFTSellable.length > 0 ?
                                    <Typography gutterBottom variant="h5" component="div" className="nft-details">
                                        <div>
                                            NFT ID<br />
                                            NFT Owners<br />
                                            NFT Price<br />
                                        </div>
                                        <div>
                                            {'#' + NFTSellable[index]}<br />
                                            {'0x' + NFTSellableOwners[index].charAt(2) + NFTSellableOwners[index].charAt(3) + NFTSellableOwners[index].charAt(4) + NFTSellableOwners[index].charAt(5) + '...' + NFTSellableOwners[index].charAt(NFTSellableOwners[index].length - 4) + NFTSellableOwners[index].charAt(NFTSellableOwners[index].length - 3) + NFTSellableOwners[index].charAt(NFTSellableOwners[index].length - 2) + NFTSellableOwners[index].charAt(NFTSellableOwners[index].length - 1)}<br /> 
                                            {ethers.utils.formatEther(String(NFTSellablePrice[index]))}<br />
                                        </div>
                                    </Typography>
                                    :
                                    <Typography gutterBottom variant="h5" component="div" className="nft-description">
                                        NFT #{ID}
                                    </Typography>
                            } */}
                            <Typography gutterBottom variant="h5" component="div" className="nft-description">
                                NFT #{
                                    dashboard.menu === "MarketPlace" ?
                                        NFTSellable[index]
                                        : dashboard.menu === "My NFTs" ?
                                            ID
                                            : ''
                                }
                            </Typography>
                            <hr />
                            {
                                dashboard.menu === "MarketPlace" ?
                                    <Typography gutterBottom variant="h5" component="div" className="nft-details">
                                        <div className="price-label">NFT PRICE</div>
                                        { console.log("Price - ", NFTSellablePrice[index]) }
                                        {
                                            NFTSellablePrice.length > 0 ?
                                                <div className="price">{ethers.utils.formatEther(String(NFTSellablePrice[index]))} ETH<br /></div>
                                                : ''
                                        }
                                    </Typography>
                                    : ''
                            }
                        </CardContent>
                    </CardActionArea>
                </Card>
                {/* { console.log("menu - ", dashboard)}
                { console.log("NFTSellableOwners - ", NFTSellableOwners)} */}
                <div className='all-buttons'>
                    {
                        dashboard.menu === "My NFTs" ?
                            <>
                                <Button
                                    variant="contained"
                                    className="mynft-button transfer-button"
                                    name={ID}
                                    onClick={() => openForm(ID)} >
                                    Transfer
                                </Button>
                                <Button
                                    variant="contained"
                                    className="mynft-button sell-button"
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
                                    Make Fractional
                                </Button>
                            </>
                            :
                            dashboard.menu === "MarketPlace" && NFTSellableOwners.length > 0 ?
                                data.uAuth !== null && data.uAuth !== undefined && Object.keys(data.uAuth).length > 0 ?
                                    NFTSellableOwners[index].toLowerCase() === String(data.uAuth.sub) ?
                                        <Button
                                            variant="contained"
                                            className="fractional-button"
                                            name={NFTSellable[index]}
                                            onClick={() => cancelSellableNFT(NFTSellable[index],) }
                                        >
                                            CANCEL
                                        </Button>
                                        :
                                        <Button
                                            variant="contained"
                                            className="fractional-button"
                                            name={NFTSellable[index]}
                                            onClick={() => buySellableNFT(NFTSellable[index], ethers.utils.formatEther(String(NFTSellablePrice[index])))} >
                                            BUY
                                        </Button>
                                    :
                                    <>
                                        {console.error('Please connect wallet first')}
                                    </>
                                :
                                ''
                    }

                </div>
                <DialogueContainer
                    data={getdata}
                    ID={ID}
                    sellForm={sellForm}
                    openForm={openForm}
                    updateNFTs={updateNFTs}
                />
            </BlockUI>
        </div >
    )
}

export default NFTs;