const { expect } = require("chai");

describe("MyToken tests", () => {
	let MyToken, mytoken, owner, addr1, addr2;

	beforeEach(async () => {
		MyToken = await ethers.getContractFactory("MyToken");
		mytoken = await MyToken.deploy();
		[owner, addr1, addr2, _] = await ethers.getSigners();
	});

	describe("Deployment", () => {
		it("Should set the right owner", async () => {
			expect(await mytoken.owner()).to.equal(owner.address);
		});

		it("Should assign the total supply of tokens to the owner", async () => {
			const ownerBalance = await mytoken.balanceOf(owner.address);
			expect(await mytoken.totalSupply()).to.equal(ownerBalance);
		});
	});

	describe("Transactions", () => {
		it("Should transfer tokens between accounts", async () => {
			await mytoken.transfer(addr1.address, 500);
			const addr1Balance = await mytoken.balanceOf(addr1.address);
			expect(addr1Balance).to.equal(500);

			await mytoken.connect(addr1).transfer(addr2.address, 100);
                        const addr2Balance = await mytoken.balanceOf(addr2.address);
                        expect(addr2Balance).to.equal(100);
			// expect(await balanceOf(addr1.address)).to.equal(400); move to another test
		});

		it("Sender doesnt have enough tokens", async () => {
			const initAddr2Balance = await mytoken.balanceOf(addr2.address);

			await expect(
				mytoken
					.connect(addr1)
					.transfer(addr2.address, 100)
			)
				.to
				.be
				.revertedWith("User doesnt have enough tokens on balance");

			expect(await mytoken.balanceOf(addr2.address)).to.equal(initAddr2Balance);
		});

		it("Should update balances after token transfers", async () => {
			const initOwnerBalance = await mytoken.balanceOf(owner.address);

			await mytoken.transfer(addr1.address, 600);
			await mytoken.transfer(addr2.address, 400);

			expect(await mytoken.balanceOf(owner.address)).to.equal(initOwnerBalance - 1000);
			expect(await mytoken.balanceOf(addr1.address)).to.equal(600);
			expect(await mytoken.balanceOf(addr2.address)).to.equal(400)
		});
	});
});

