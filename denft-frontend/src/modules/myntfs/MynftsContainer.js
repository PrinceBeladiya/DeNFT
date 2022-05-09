import React from 'react';
import Mynfts from './Mynfts';
import MainTemplateContainer from '../../shared/templates/MainTemplate/MainTemplateContainer';
import { connect } from 'react-redux';
import { updateNFT } from './redux/actions';
import { updateAccount } from '../landing/redux/actions';
import PropTypes from 'prop-types';

const MynftsContainer = (props) => {

    return (
        <MainTemplateContainer>
            <Mynfts
                getdata={props.data}
                data={props.getdata}
                updateNFTs={props.updateList}
                updateAccount={props.updateAccountAddress}
            />
        </MainTemplateContainer>
    )
}

MynftsContainer.propTypes = {
    getdata: PropTypes.object,
    updateNFTs: PropTypes.func,
    updateAccount: PropTypes.func
};

MynftsContainer.defaultProps = {
    getdata : {
        NFTList : [],
        account : '',
        loading : false,
        receipientAddress : '',
        textlabel : '',
        title : '',
        transferableToken : ''
    }
};

const mapStateToProps = state => ({
    data: state.mynft,
    getdata: state.landing,
});

const mapDispatchToProps = dispatch => ({
    updateList: NFTList => dispatch(updateNFT(NFTList)),
    updateAccountAddress: account => dispatch(updateAccount(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MynftsContainer);