import { ethers } from 'ethers';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import TransferDialogue from './transferDialog';
import SellDialogue from './sellDialog';
import SendFractionalDialog from './SendFractionalDialog';
import FractionalDialogue from './fractionalDialog';
import { DeNFTContract, FractionalERC721FactoryContract, MarketPlaceContract, signer, web3Signer } from '../../../../utils/etherIndex';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { updateLoading, updateTransactionID, updateTransferableToken } from '../../../../modules/myntfs/redux/actions';
import { openForm, OpenSellForm, titleOfForm, labelOfForm, inputText } from '../../../../modules/landing/redux/actions';
import { closeDialog, openDialog } from '../../../../modules/dashboard/redux/actions';
import { noop } from '../../../../utils';
import { SELL_DIALOGUE } from './DialogNames';
import { showNotification } from '../../../../utils/Notifications';
import FractionalERC20Vault from '../../../../contracts/contracts/Fractional/FractionalERC20Vault.sol/FractionalERC20Vault.json';
import { submit } from 'redux-form';
import { TRANSFER_DIALOGUE } from './DialogNames';

const DialogueContainer = ({
    getdata,
    data,
    dialog,
    updateReceipient,
    updateDialogue,
    updateToken,
    updateLoader,
    updateNFTs,
    closeDialog,
    getOwnerTokens,
    vaultID,
    index,
    currentDialogNames,
    submit,
    updateID
}) => {

    const [price, setPrice] = useState(0);
    const [fractionalName, setFractionalName] = useState('');
    const [fractionalSymbol, setFractionalSymbol] = useState('');
    const [fractionalTotalSupply, setFractionalTotalSupply] = useState(0);
    const [fractionalInitialPrice, setFractionalInitialPrice] = useState('');

    const handleAddress = (e) => {
        updateReceipient(e.target.value);
    }

    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    const transferNFT = async (ID) => {
        const { ethereum } = window;
        updateID(ID);
        updateLoader(true);

        try {
            const transfterTx = await DeNFTContract.connect(web3Signer).transfer(data.receipientAddress, getdata.transferableToken);
            await transfterTx.wait();

            getOwnerTokens();
            updateLoader(false);
            closeDialog(TRANSFER_DIALOGUE);
            
            showNotification("Your NFT is successfully transfered", "success", 3000);

            const tokens = await DeNFTContract.functions.totalTokens();
            const tokensOfOwner = await DeNFTContract.functions.tokensOfOwnerBySize(ethereum.selectedAddress, 0, tokens);

            const tokenIDs = tokensOfOwner[0].map(token => {
                return Number(token);
            });

            updateNFTs(tokenIDs);

        } catch (error) {
            updateLoader(false);
            showNotification("Something went wrong", "error", 3000);
            console.log("error - ", error);
        }
    };

    const handleName = (e) => {
        setFractionalName(e.target.value);
    }

    const handleSymbol = (e) => {
        setFractionalSymbol(e.target.value);
    }

    const handleSupply = (e) => {
        setFractionalTotalSupply(e.target.value);
    }

    const handleListPrice = (e) => {
        setFractionalInitialPrice(e.target.value);
    }

    const sellNFT = async () => {
        updateLoader(true);

        const { transferableToken } = getdata;
        const { ethereum } = window;

        updateLoader(true);
        try {
            const isApprovedForAll = await DeNFTContract.connect(web3Signer).isApprovedForAll(ethereum.selectedAddress, MarketPlaceContract.address);
            if(!isApprovedForAll) {
                const setApprovalForAll = await DeNFTContract.connect(web3Signer).setApprovalForAll(MarketPlaceContract.address, true);
                await setApprovalForAll.wait();
            }
            const askOrder = await MarketPlaceContract.connect(web3Signer).createAskOrder(DeNFTContract.address, transferableToken, String(ethers.utils.parseEther(price)))
            await askOrder.wait();
            closeDialog(SELL_DIALOGUE);
            updateLoader(false);
            getOwnerTokens();
            showNotification("successfully order placed", "success", 3000);
        } catch (error) {
            console.log("Error -> ", error);
            updateLoader(false);
            showNotification("Transaction unsuccessfull", "error", 3000);
        }
    }

    const FractionalNFT = async (e) => {
        updateLoader(true);

        if (fractionalName.length > 0 && fractionalSymbol.length > 0 && fractionalTotalSupply.length > 0 && fractionalInitialPrice.length > 0) {
            const { transferableToken } = getdata;

            try {
                const approve = await DeNFTContract.connect(web3Signer).approve(FractionalERC721FactoryContract.address, transferableToken);
                await approve.wait();
                const mintFractional = await FractionalERC721FactoryContract.connect(web3Signer).mint(DeNFTContract.address, transferableToken, String(fractionalName), String(fractionalSymbol), String(ethers.utils.parseEther(fractionalTotalSupply)), String(ethers.utils.parseEther(fractionalInitialPrice)));
                await mintFractional.wait();
                updateLoader(false);
                showNotification("Fractional successfully", 'success', 3000 );
            } catch (error) {
                console.log("Error -> ", error);
                updateLoader(false);
                showNotification("Fractional unsuccessfull", "error", 3000);
            }
        } else {
            showNotification("Please enter all details correctly", "error", 3000);
        }
    }

    const sendFractional = async (ID) => {
        updateLoader(true);

        try {

            const vaultContractAddress = await FractionalERC721FactoryContract.connect(web3Signer).vaultToVaultContract(ID);
            const vaultContract = new ethers.Contract(vaultContractAddress, FractionalERC20Vault.abi, signer);

            const transfer = await vaultContract.connect(web3Signer).transfer(data.receipientAddress, String(ethers.utils.parseEther(price)));
            await transfer.wait();

            updateLoader(false);
            showNotification("Your NFT Fractional is successfully transfered", 'success', 3000);
        } catch (error) {
            updateLoader(false);
            showNotification("Transaction Failed", 'error', 3000);
            console.log("error - ", error);
        }
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
                        dialog.currentDialogNames[0] === "FRACTIONAL_DIALOGUE" ?
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
                            :
                            dialog.currentDialogNames[0] === "SEND_FRACTIONAL_DIALOGUE" ?
                                <SendFractionalDialog
                                    ID={getdata.transferableToken}
                                    updateToken={updateToken}
                                    handleAddress={handleAddress}
                                    handlePrice={handlePrice}
                                    sendFractional={sendFractional}
                                    vaultID={vaultID}
                                    index={index}
                                    closeDialog={closeDialog}
                                    currentDialogNames={currentDialogNames}
                                    submit={submit}
                                />
                                : ''

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
    closeDialog: PropTypes.func,
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
    },
    closeDialog: noop
};

const mapStateToProps = state => ({
    getdata: state.mynft,
    data: state.landing,
    dialog: state.dashboard,
    currentDialogNames: state.dashboard.currentDialogNames,
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
    closeDialog: dialogName => dispatch(closeDialog(dialogName)),
    submit: formName => dispatch(submit(formName)),
    updateID: id => dispatch(updateTransactionID(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogueContainer);