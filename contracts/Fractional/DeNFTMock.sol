pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DeNFTMock is Ownable, ERC721 {
  
  uint tokenId = 1;

  constructor() ERC721("DeNFT", "DNFT") {}

  function mint() public {
    _mint(msg.sender, tokenId);
    tokenId++;
  }

}