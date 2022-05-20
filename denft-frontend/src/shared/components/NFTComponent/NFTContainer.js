import { connect } from 'react-redux';
import NFTs from './NFT';
import PropTypes from 'prop-types';
import { updateNFT, updateTransferableToken } from '../../../modules/myntfs/redux/actions';
import { titleOfForm, labelOfForm, openForm } from '../../../modules/landing/redux/actions';
import { DeNFTContract, FractionalERC721FactoryContract, MarketPlaceContract, signer, web3Signer } from '../../../utils/etherIndex';
import { useEffect, useState } from 'react';
import { openDialog, setMainMenu } from '../../../modules/dashboard/redux/actions';
import { ethers } from 'ethers';
import { noop } from '../../../utils';
import { showNotification } from '../../../utils/Notifications';
import FractionalERC20Vault from '../../../contracts/contracts/Fractional/FractionalERC20Vault.sol/FractionalERC20Vault.json';

const NFTContainer = ({
    NFTID,
    data,
    dashboard,
    updateMainMenu,
    index,
    getdata,
    openDialog,
    NFTSellable = [],
    updateToken,
    updateNFTs,
    getSellableNFTs,
    tokens,
    owners,
    price,
    getOwnerTokens,
    menu,
    FractionalNFTBalance,
    FractionalNFTOwner,
    vaultID,
    loader,
    ID,
    updateID,
    totalSupply
}) => {

    useEffect(() => {
        const imageURIs = async () => {
            // console.log("url - ", window.location.href.split('/'));
            if (dashboard.menu === "MarketPlace") {
                const img = await DeNFTContract.functions.tokenURI(NFTSellable[index]);
                setImage(img[0]);
            } else if (dashboard.menu === "My NFTs") {
                const img = await DeNFTContract.functions.tokenURI(NFTID);
                setImage(img[0]);
            } else {
                const url = window.location.href.split('/');
                const page = url[url.length - 1];
                let img;

                switch (page) {
                    case "marketplace": updateMainMenu("MarketPlace");
                        img = await DeNFTContract.functions.tokenURI(NFTSellable[index]);
                        setImage(img[0]);
                        break;
                    case "my-nfts": updateMainMenu("My NFTs");
                        img = await DeNFTContract.functions.tokenURI(NFTID);
                        setImage(img[0]);
                        break;
                    default:
                }
            }
        }


        imageURIs();

    }, []);

    const [image, setImage] = useState();

    const sellForm = (ID = 0) => {
        updateToken(ID);
        openDialog("SELL_DIALOGUE");
    }

    const openForm = (ID = 0) => {
        updateToken(ID);
        openDialog("TRANSFER_DIALOGUE");
    }

    const fractionalForm = (ID = 0) => {
        updateToken(ID);
        openDialog("FRACTIONAL_DIALOGUE");
    }

    const sendFractional = async (ID = 0) => {
        updateToken(ID);
        openDialog("SEND_FRACTIONAL_DIALOGUE");
    }

    const cancelSellableNFT = async (ID = 0) => {
        try {
            const cancelAskOrder = await MarketPlaceContract.connect(web3Signer).cancelAskOrder(DeNFTContract.address, ID);
            await cancelAskOrder.wait();
            getSellableNFTs();
        } catch (error) {
            console.log("Error -> ", error);
        }
    }

    const buySellableNFT = async (ID = 0, price) => {
        try {
            const buyTokenTx = await MarketPlaceContract.connect(web3Signer).buyTokenUsingETH(DeNFTContract.address, ID, { value: ethers.utils.parseEther(price) });
            await buyTokenTx.wait();
            getSellableNFTs();
            showNotification("Order excecuted successfully", "success", 3000);
        } catch (error) {
            console.log("Error -> ", error);
        }
    }

    return (
        <>
            <NFTs
                dashboard={dashboard}
                getdata={data}
                data={getdata}
                ID={NFTID}
                index={index}
                sellForm={sellForm}
                openForm={openForm}
                fractionalForm={fractionalForm}
                updateNFTs={updateNFTs}
                image={image}
                NFTSellable={tokens}
                NFTSellableOwners={owners}
                NFTSellablePrice={price}
                cancelSellableNFT={cancelSellableNFT}
                buySellableNFT={buySellableNFT}
                getOwnerTokens={getOwnerTokens}
                menu={menu}
                FractionalNFTBalance={FractionalNFTBalance}
                FractionalNFTOwner={FractionalNFTOwner}
                sendFractional={sendFractional}
                vaultID={vaultID}
                loader={loader}
                transactionalID={ID}
                totalSupply={totalSupply}
            />
        </>
    )
}

NFTContainer.propTypes = {
    NFTID: PropTypes.number,
    data: PropTypes.instanceOf(Object),
    getdata: PropTypes.instanceOf(Object),
    updateSellOpen: PropTypes.func,
    updateDialogue: PropTypes.func,
    updateTitle: PropTypes.func,
    updateTextLabel: PropTypes.func,
    updateToken: PropTypes.func,
    getOwnerTokens: PropTypes.func,
};

NFTContainer.defaultProps = {
    NFTID: 0,
    data: {
        NFTList: [],
        account: '',
        loading: false,
        transferableToken: '',
    },
    getdata: {
        loading: false,
        open: false,
        receipientAddress: '',
        sellOpen: false,
        textLabel: '',
        title: '',
        account: ''
    },
    getOwnerTokens: noop,
};

const mapStateToProps = state => ({
    data: state.mynft,
    loader: state.mynft.loading,
    ID: state.mynft.id,
    dashboard: state.dashboard,
    getdata: state.landing,
    tokens: state.home.SellableNFTs,
    owners: state.home.SellableNFTOwners,
    price: state.home.SellableNFTPrice,
});

const mapDispatchToProps = dispatch => ({
    updateToken: token => dispatch(updateTransferableToken(token)),
    updateTitle: title => dispatch(titleOfForm(title)),
    updateTextLabel: label => dispatch(labelOfForm(label)),
    updateDialogue: State => dispatch(openForm(State)),
    openDialog: name => dispatch(openDialog(name)),
    updateMainMenu: selectedMenu => dispatch(setMainMenu(selectedMenu)),
    updateNFTs: NFTList => dispatch(updateNFT(NFTList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NFTContainer);