import React, { useState } from 'react';
import Mynfts from './Mynfts';
import MyFractionalNFTs from './fractional/MyFractionalNFTsContainer';
import MainTemplateContainer from '../../shared/templates/MainTemplate/MainTemplateContainer';
import { connect } from 'react-redux';
import { updateNFT } from './redux/actions';
import { updateAccount } from '../landing/redux/actions';
import PropTypes from 'prop-types';

const menuItems = [
    {
        title: 'My NFTs',
        key: 'my-nfts',
    },
    {
        title: 'My Fractional NFTs',
        key: 'my-fractional-nfts',
    },
]

const MynftsContainer = (props) => {

    const [selectedMenuItem, setSelectedMenuItem] = useState(menuItems[0].key);

    const onMenuClick = (key = menuItems[0].key) => {
        setSelectedMenuItem(key);
    }

    return (
        <MainTemplateContainer>
            <div className="my-nfts-container">

                <div className="menu-items">
                    {
                        menuItems.map(menuItem => (
                            <div
                                className={`menu-item ${menuItem.key === selectedMenuItem && "active"}`}
                                key={menuItem.key}
                                role="presentation"
                                onClick={() => onMenuClick(menuItem.key)}
                            >
                                {menuItem.title}
                            </div>
                        ))
                    }
                </div>
                {
                    selectedMenuItem === menuItems[0].key && (
                        <Mynfts
                            getdata={props.data}
                            data={props.getdata}
                            updateNFTs={props.updateList}
                            updateAccount={props.updateAccountAddress}
                        />
                    )
                }
                {
                    selectedMenuItem === menuItems[1].key && (
                        <MyFractionalNFTs />
                    )
                }
            </div>
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