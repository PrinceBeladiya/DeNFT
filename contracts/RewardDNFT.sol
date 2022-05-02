//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract RewardDNFT {
    string public name = "RewardDNFT";
    string public symbol = "RDNF";
    uint public decimal = 18;
    uint public totalsupply = 100000000 * ( 10 ** decimal);
    address public owner;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) approvers;

    event Transfer(address indexed from, address indexed to, uint amount);
    event Approval(address indexed from, address indexed spender, uint amount);

    constructor(address sender) {
        owner = sender;
        balances[owner] = totalsupply;
    }
    
    function balanceOf(address account) public view returns(uint) {
        require(account != address(0), "You searched for empty account balance");
        return balances[account];
    }

    function transfer(address to, uint amount) public returns(bool) {
        require(to != address(0), "You make transaction with not existance account");
        require(balances[msg.sender] >= amount, "You dont have sufficient amount to transfer");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);

        return true;
    }

    function transferFrom(address from, address to, uint amount) public returns(bool) {
        require(from != address(0), "Please provide proper address of sender");
        require(to != address(0), "You make transaction with not exist account");
        require(balances[from] >= amount, "Not sufficient amount for transaction");
        require(approvers[from][msg.sender] <= amount, "Not have approval for this amount transaction");

        balances[from] -= amount;
        approvers[from][msg.sender] -= amount;

        balances[to] += amount;
        
        emit Transfer(from, to, amount);

        return true;
    }
}