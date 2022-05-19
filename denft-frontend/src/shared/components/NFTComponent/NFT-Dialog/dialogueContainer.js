import { ethers } from 'ethers';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import TransferDialogue from './transferDialog';
import SellDialogue from './sellDialog';
import FractionalDialogue from './fractionalDialog';
import { DeNFTContract, MarketPlaceContract, web3Signer } from '../../../../utils/etherIndex';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { updateLoading, updateTransferableToken } from '../../../../modules/myntfs/redux/actions';
import { openForm, OpenSellForm, titleOfForm, labelOfForm, inputText } from '../../../../modules/landing/redux/actions';
import { openDialog } from '../../../../modules/dashboard/redux/actions';
import { parseEther } from 'ethers/lib/utils';

const DialogueContainer = ({
    getdata,
    data,
    dialog,
    updateReceipient,
    updateDialogue,
    updateToken,
    updateSellOpen,
    updateLoader,
    updateNFTs
}) => {

    const [price, setPrice] = useState(0);

    const handleAddress = (e) => {
        updateReceipient(e.target.value);
    }

    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    const transferNFT = async (e) => {
        updateDialogue(false);
        updateLoader(true);

        try {
            const { ethereum } = window;

            console.log("Signer - ", web3Signer);
            await DeNFTContract.connect(web3Signer).transfer(data.receipientAddress, getdata.transferableToken);

            updateLoader(false);
            toast.success("Your NFT is successfully transfered", { autoClose: 2000 });

            const tokens = await DeNFTContract.functions.totalTokens();
            const tokensOfOwner = await DeNFTContract.functions.tokensOfOwnerBySize(ethereum.selectedAddress, 0, tokens);

            const tokenIDs = tokensOfOwner[0].map(token => {
                return Number(token);
            });

            updateNFTs(tokenIDs);

        } catch (error) {
            updateLoader(false);
            toast.warning("Something went wrong", { autoClose: 2000 });
            console.log("error - ", error);
        }
    };

    const handleName = (e) => {

    }
    const handleSymbol = (e) => {

    }
    const handleSupply = (e) => {

    }
    const handleListPrice = (e) => {

    }

    const sellNFT = async () => {
        const { transferableToken } = getdata;
        const { ethereum } = window;

        updateLoader(true);
        try {
            // console.log("Called");
            // console.log("Price - ", String(ethers.utils.parseEther(price)));
            console.log("contract address - ", DeNFTContract.address);
            console.log("ethereum address - ", ethereum.selectedAddress);
            console.log("Signer - ", web3Signer);

            // await MarketPlaceContract.connect(web3Signer).addCollection(DeNFTContract.address, ethereum.selectedAddress)
            await DeNFTContract.connect(web3Signer).approve(MarketPlaceContract.address, transferableToken);
            await MarketPlaceContract.connect(web3Signer).createAskOrder(DeNFTContract.address, transferableToken, String(ethers.utils.parseEther(price)))
            updateLoader(false);
        } catch (error) {
            console.log("Error -> ", error);
            updateLoader(false);
        }
    }

    const FractionalNFT = () => {

    }

    return (
        <div>
            {
                dialog.currentDialogNames[0] === "TRANSFER_DIALOGUE" ?
                    <TransferDialogue
                        data={data}
                        handleAddress={handleAddress}
                        transferNFT={transferNFT}
                        updateToken={updateToken}
                        ID={getdata.transferableToken}
                    />
                    :
                    dialog.currentDialogNames[0] === "SELL_DIALOGUE" ?
                        <SellDialogue
                            data={data}
                            handleAddress={handleAddress}
                            handlePrice={handlePrice}
                            updateToken={updateToken}
                            sellNFT={sellNFT}
                            ID={getdata.transferableToken}
                        />
                        :
                        <FractionalDialogue
                            data={data}
                            handleAddress={handleAddress}
                            FractionalNFT={FractionalNFT}
                            handlePrice={handlePrice}
                            updateToken={updateToken}
                            ID={getdata.transferableToken}
                            handleName={handleName}
                            handleSymbol={handleSymbol}
                            handleSupply={handleSupply}
                            handleListPrice={handleListPrice}
                        />

            }

        </div>
    )
}

DialogueContainer.propTypes = {
    updateNFTs: PropTypes.func,
    NFTID: PropTypes.number,
    getdata: PropTypes.object,
    data: PropTypes.object,
    dialog: PropTypes.object,
    updateLoader: PropTypes.func,
    updateSellOpen: PropTypes.func,
    updateDialogue: PropTypes.func,
    updateTitle: PropTypes.func,
    updateTextLabel: PropTypes.func,
    updateToken: PropTypes.func,
    updateReceipient: PropTypes.func,
};

DialogueContainer.defaultProps = {
    NFTID: 0,
    getdata: {
        NFTList: [],
        account: '',
        loading: false,
        transferableToken: '',
    },
    data: {
        loading: false,
        open: false,
        receipientAddress: '',
        sellOpen: false,
        textLabel: '',
        title: ''
    }
};

const mapStateToProps = state => ({
    getdata: state.mynft,
    data: state.landing,
    dialog: state.dashboard,
});

const mapDispatchToProps = dispatch => ({
    updateLoader: loading => dispatch(updateLoading(loading)),
    updateSellOpen: sellOpen => dispatch(OpenSellForm(sellOpen)),
    updateDialogue: State => dispatch(openForm(State)),
    updateToken: token => dispatch(updateTransferableToken(token)),
    updateReceipient: address => dispatch(inputText(address)),
    updateTitle: title => dispatch(titleOfForm(title)),
    updateTextLabel: label => dispatch(labelOfForm(label)),
    openDialog: name => dispatch(openDialog(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogueContainer);