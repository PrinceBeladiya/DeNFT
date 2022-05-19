pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./FractionalERC20Vault.sol";

contract FractionalERC721Factory {
  uint public vaultCount = 0;

  mapping(uint => address) public vaultToVaultContract;

  constructor() {}

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
    return vaultCount;
  }

}
