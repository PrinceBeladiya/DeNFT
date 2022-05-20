import React from 'react';
import NFTContainer from '../../../shared/components/NFTComponent/NFTContainer';

const Repay = ({
    replayableTokens,
    replayableTokensDetails,
}) => {
    return (
        <div className='repay-header-container'>
            <div className='repay-main-container-mynft'>
                {console.log("replayable - ", replayableTokensDetails)}
                {
                    replayableTokensDetails.map((token, index) => (
                        <NFTContainer
                            NFTID={Number(token.tokenId)}
                            replayableTokensDetails={replayableTokensDetails}
                            isRepay={true}
                            index={index}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Repay;