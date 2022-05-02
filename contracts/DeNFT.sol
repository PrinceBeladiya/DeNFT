//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface ISimpleInterface {
    function transfer(address to, uint256 amount) external returns (bool);

    function balanceOf(address account) external returns (uint256);
}

contract DeNFT {
    string public name = "DeNFT";
    string public symbol = "DNFT";
    uint256 private tokenId = 1;
    uint256 private holders;
    address public tokenContract = address(this);
    uint256 private startDate = 0;
    uint256 private distributeDate = 0;

    mapping(uint256 => address) owners;
    mapping(address => uint256) balances;
    mapping(address => uint256) chargeEthereum;
    mapping(uint256 => address) approvals;
    mapping(address => mapping(address => bool)) AllTokensApprovals;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenID
    );
    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenID
    );
    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );
    event GetRewards(address indexed account, uint256 balance);

    constructor() {
        startDate = block.timestamp;
    }

    function balanceOf(address account) external view returns (uint256) {
        require(account != address(0), "You check balance of empty address");

        return balances[account];
    }

    function ownerOf(uint256 tokenID) external view returns (address) {
        require(
            owners[tokenID] != address(0),
            "You find owner of not exist token"
        );

        return owners[tokenID];
    }

    function transfer(address to, uint256 tokenID) external payable {
        require(to != address(0), "You cant make transaction to empty address");
        require(
            owners[tokenID] == msg.sender,
            "You dont have an access for do this transaction"
        );

        balances[msg.sender] -= 1;

        owners[tokenID] = to;
        balances[to] += 1;

        emit Transfer(msg.sender, to, tokenID);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenID
    ) external payable {
        require(
            from != address(0),
            "You cant make transaction from empty account address"
        );
        require(
            to != address(0),
            "You cant make transaction to empty account address"
        );
        require(
            owners[tokenID] == from,
            "Owner dont have access to this tokenID"
        );
        require(
            approvals[tokenID] == msg.sender ||
                AllTokensApprovals[from][msg.sender] == true,
            "You cant do this transaction as approver"
        );

        balances[from] -= 1;
        balances[to] += 1;
        owners[tokenID] = to;

        emit Transfer(from, to, tokenID);
    }

    function approve(address approved, uint256 tokenID) external payable {
        require(
            approved != address(0),
            "You cant make approver of token with empty address"
        );
        require(
            owners[tokenID] == msg.sender,
            "You dont have access of this token"
        );

        approvals[tokenID] = approved;

        emit Approval(msg.sender, approved, tokenID);
    }

    function setApprovalForAll(address operator, bool approved) external {
        require(
            operator != address(0),
            "You can not make approval which has empty address"
        );

        AllTokensApprovals[msg.sender][operator] = true;

        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function getApproved(uint256 tokenID) external view returns (address) {
        require(
            owners[tokenID] != address(0),
            "You find owner of not exist token"
        );

        return approvals[tokenID];
    }

    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool)
    {
        require(
            owner != address(0),
            "You cant check approval by passing empty address of owner"
        );
        require(
            operator != address(0),
            "You cant check approval by passing empty address of operator"
        );

        if (AllTokensApprovals[owner][operator] == true) {
            return true;
        } else {
            return false;
        }
    }

    function mint() external payable {
        require(msg.value == 1 ether, "Require 1 ether for buy 1 NFT");
        chargeEthereum[address(this)] += 1 ether;

        balances[msg.sender] += 1;
        owners[tokenId] = msg.sender;

        emit Transfer(address(this), msg.sender, tokenId);
        holders = tokenId;
        tokenId++;
    }

    function reward(address simpleContractAddress) external {
        require(holders >= 1, "No one has an NFT");
        require(
            startDate + 1 weeks <= block.timestamp,
            "You cant do this operation now"
        );
        uint256 i;
        uint256 value;

        startDate = block.timestamp;
        for (i = 1; i <= holders; i++) {
            address to = owners[i];

            ISimpleInterface(simpleContractAddress).transfer(
                to,
                (10 * (10**18))
            );

            value = ISimpleInterface(simpleContractAddress).balanceOf(
                owners[i]
            );

            emit GetRewards(owners[i], value);
        }
    }
}
