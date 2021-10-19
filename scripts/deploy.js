async function main() {
	const [deployer] = await ethers.getSigners();
	console.log(`Deploying contracts with account: ${deployer.address}`);

	const balance = await deployer.getBalance();
	console.log(`Account balance: ${balance.toString()}`);
	// the same: console.log("Account balance: %s", balance.toString());

	const MyToken = await ethers.getContractFactory("MyToken");
	const mytoken = await MyToken.deploy();
	console.log(`Token address: ${mytoken.address}`);
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
