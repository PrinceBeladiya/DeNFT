//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MarketPlaceTokens {
    
    mapping(uint => uint) sellableTokens;
    uint[] public sellableTokensID;

    function sell(uint tokenid, uint amount) external {
        sellableTokens[tokenid] = amount;
        sellableTokensID.push(tokenid);
    } 

    function sellTokens() external view returns(uint[] memory) {
        return sellableTokensID; 
    }
}