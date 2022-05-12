pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./FractionalERC20.sol";

contract FractionalERC721 is ERC721 {

  uint public tokenCounter = 1;

  mapping(uint => address) public nftIdToTokens;
  // address[] public tokens;

  constructor() ERC721("FractionalNFT", "FNFT") {}

  function mint(string memory _tokenName, string memory _tokenSymbol, uint _totalSupply) public {
    _mint(msg.sender, tokenCounter);
    FractionalERC20 fractionalERC20 = new FractionalERC20(_tokenName, _tokenSymbol, _totalSupply, tokenCounter);
    fractionalERC20.transfer(msg.sender , _totalSupply);
    nftIdToTokens[tokenCounter] = address(fractionalERC20);
    // tokens.push(address(fractionalERC20));
    tokenCounter++;
  }


}