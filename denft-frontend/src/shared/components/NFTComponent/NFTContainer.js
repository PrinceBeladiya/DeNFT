import { connect } from 'react-redux';
import NFTs from './NFT';
import PropTypes from 'prop-types';
import { updateTransferableToken } from '../../../modules/myntfs/redux/actions';
import { titleOfForm, labelOfForm, openForm } from '../../../modules/landing/redux/actions';

const NFTContainer = ({
    NFTID,
    data,
    getdata,
    updateDialogue,
    updateTitle,
    updateTextLabel,
    updateToken,
    updateNFTs
}) => {

    const sellForm = (ID = 0) => {
        updateToken(ID);
        updateTitle('Sell NFT #' + ID);
        updateTextLabel('Price of NFT(ETHER)');
        updateDialogue(true);
    }

    const openForm = (ID = 0) => {
        updateToken(ID);
        updateTitle('Transfer NFT #' + ID);
        updateTextLabel('Receipient Address');
        updateDialogue(true);
    }

    return (
        <>
            <NFTs
                getdata={data}
                data={getdata}
                ID={NFTID}
                sellForm={sellForm}
                openForm={openForm}
                updateNFTs={updateNFTs}
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
        account:''
    }
};

const mapStateToProps = state => ({
    data: state.mynft,
    getdata: state.landing,
});

const mapDispatchToProps = dispatch => ({
    updateToken: token => dispatch(updateTransferableToken(token)),
    updateTitle: title => dispatch(titleOfForm(title)),
    updateTextLabel: label => dispatch(labelOfForm(label)),
    updateDialogue: State => dispatch(openForm(State)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NFTContainer);