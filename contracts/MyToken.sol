pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyToken {
	string public name = "My Token";
	string public symbol = "MT";
	uint256 public totalSupply = 1000000;
	address public owner;
	mapping(address => uint256) balances;

	constructor() {
		owner = msg.sender;
		balances[msg.sender] = totalSupply;
	}

	function transfer(address to, uint256 amount) external {
		console.log("Sender balance is equal to %s tokens", balances[msg.sender]);
		console.log("Trying to send %s tokens to %s", amount, to);

		require(balances[msg.sender] >= amount, "User doesnt have enough tokens on balance");
		
		balances[msg.sender] -= amount;
		balances[to] += amount;

		console.log("Successfully transfered");
	}

	function balanceOf(address account) external view returns(uint256) {
		return balances[account];
	}
}
