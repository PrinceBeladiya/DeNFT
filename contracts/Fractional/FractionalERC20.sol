pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FractionalERC20 is ERC20 {

  uint immutable public nftId;

  constructor(
    string memory _tokenName,
    string memory _tokenSymbol,
    uint _totalSupply,
    uint _nftId
  )
    ERC20(_tokenName, _tokenSymbol)
  {
    _mint(msg.sender, _totalSupply);
    nftId = _nftId;
  }

}