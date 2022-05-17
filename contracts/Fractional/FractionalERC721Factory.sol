pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./FractionalERC20Vault.sol";
import "../DeNFT.sol";

contract FractionalERC721Factory is ERC721 {

  uint public vaultCount = 1;

  mapping(uint => address) public vaultToVaultContract;

  constructor() ERC721("FractionalNFT", "FNFT") {}

  function mint(
    address _nftCollection,
    uint _id,
    string memory _name,
    string memory _symbol,
    uint _totalSupply,
    uint _listPrice
  )
    public
    returns (uint _vaultCount)
  {
    FractionalERC20Vault fractionalERC20Vault = new FractionalERC20Vault(msg.sender, _nftCollection, _id, _name, _symbol, _totalSupply, _listPrice);

    IERC721(_nftCollection).transferFrom(msg.sender, address(fractionalERC20Vault), _id);

    vaultToVaultContract[vaultCount] = address(fractionalERC20Vault);
    vaultCount++;
    return vaultCount - 1;
  }


}
