import React, { useState } from 'react';
import Mynfts from './Mynfts';
import MainTemplateContainer from '../../shared/templates/MainTemplate/MainTemplateContainer';
import { connect } from 'react-redux';
import { getData, updateData } from './redux/actions';

const MynftsContainer = (props) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [transferableToken, setTransferableToken] = useState('');
    const [receipientAddress, setReceipientAddress] = useState('');
    const [tokens, setTokens] = useState([]);
    const [accounts, setAccounts] = useState([]);

    return (
        <MainTemplateContainer>
            <Mynfts
                getdata={props.getList}
                updatedata={props.updateList}
                loading={loading}
                setLoading={setLoading}
                open={open}
                setOpen={setOpen}
                transferableToken={transferableToken}
                setTransferableToken={setTransferableToken}
                receipientAddress={receipientAddress}
                setReceipientAddress={setReceipientAddress}
                tokens={tokens}
                setTokens={setTokens}
                accounts={accounts}
                setAccounts={setAccounts}
            />
        </MainTemplateContainer>
    )
}

const mapStateToProps = state => ({
    data: state.mynft.data,
});

const mapDispatchToProps = dispatch => ({
    getList: getdata => dispatch(getData(getdata)),
    updateList: updatedata => dispatch(updateData(updatedata)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MynftsContainer);