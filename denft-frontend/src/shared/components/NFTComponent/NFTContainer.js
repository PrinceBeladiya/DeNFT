import { connect } from 'react-redux';
import NFTs from './NFT';
import PropTypes from 'prop-types';
import { updateTransferableToken } from '../../../modules/myntfs/redux/actions';
import { titleOfForm, labelOfForm, openForm } from '../../../modules/landing/redux/actions';
import { DeNFTContract } from '../../../utils/etherIndex';
import { useEffect, useState } from 'react';
import { openDialog } from '../../../modules/dashboard/redux/actions';

const NFTContainer = ({
    NFTID,
    data,
    getdata,
    openDialog,
    updateDialogue,
    updateTitle,
    updateTextLabel,
    updateToken,
    updateNFTs
}) => {

    useEffect(() => {
        const imageURIs = async () => {
            const img = await DeNFTContract.functions.tokenURI(NFTID);
            setImage(img[0]);
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

    return (
        <>
            <NFTs
                getdata={data}
                data={getdata}
                ID={NFTID}
                sellForm={sellForm}
                openForm={openForm}
                fractionalForm={fractionalForm}
                updateNFTs={updateNFTs}
                image={image}
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
    }
};

const mapStateToProps = state => ({
    data: state.mynft,
    dialog : state.dashboard,
    getdata: state.landing,
});

const mapDispatchToProps = dispatch => ({
    updateToken: token => dispatch(updateTransferableToken(token)),
    updateTitle: title => dispatch(titleOfForm(title)),
    updateTextLabel: label => dispatch(labelOfForm(label)),
    updateDialogue: State => dispatch(openForm(State)),
    openDialog: name => dispatch(openDialog(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NFTContainer);