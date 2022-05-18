import { ethers } from 'ethers';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import TransferDialogue from './transferDialog';
import SellDialogue from './sellDialog';
import FractionalDialogue from './fractionalDialog';
import { DeNFTContract } from '../../../../utils/etherIndex';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { updateLoading, updateTransferableToken } from '../../../../modules/myntfs/redux/actions';
import { openForm, OpenSellForm, titleOfForm, labelOfForm, inputText } from '../../../../modules/landing/redux/actions';
import { openDialog } from '../../../../modules/dashboard/redux/actions';

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
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            console.log("contract = ", DeNFTContract);
            await DeNFTContract.functions._transfer(ethereum.selectedAddress, ethers.utils.getAddress(data.receipientAddress), getdata.transferableToken);

            let transfereTokenOwner = await DeNFTContract.functions.ownerOf(getdata.transferableToken);

            if (data.receipientAddress === transfereTokenOwner[0]) {
                updateLoader(false);
                toast.success("Your NFT is successfully transfered", { autoClose: 2000 });
            } else {
                updateLoader(false);
                toast.warning("Your NFT is not successfully transfered", { autoClose: 2000 });
            }

            const tokensOfOwner = await DeNFTContract.functions.allTokens(getdata.account);
            const tokenIDs = tokensOfOwner[0].map(token => {
                return Number(token);
            });

            updateNFTs(tokenIDs);
            updateToken(undefined);

        } catch (error) {
            updateLoader(false);
            toast.warning(error.message, { autoClose: 2000 });
            updateToken(undefined);
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

    const sellNFT = () => {

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