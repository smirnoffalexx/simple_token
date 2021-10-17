pragma solidity ^0.8.0;

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
		require(balances[msg.sender] >= amount, "User doesnt have enough tokens on balance");
		
		balances[msg.sender] -= amount;
		balances[to] += amount;
	}

	function balanceOf(address account) external view returns(uint256) {
		return balances[account];
	}
}
