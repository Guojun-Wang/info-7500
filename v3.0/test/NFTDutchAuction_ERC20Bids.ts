import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTDutchAuction_ERC20Bids", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployNFTDutchAuction_ERC20BidsFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, thirdAccount] = await ethers.getSigners();

    const myERC721Factory = await ethers.getContractFactory("MyERC721");
    const myERC721 = await myERC721Factory.deploy();

    const myERC20Factory = await ethers.getContractFactory("MyERC20");
    const myERC20 = await myERC20Factory.deploy(10000);
    const nftDutchAuction_ERC20BidsFactory = await ethers.getContractFactory("NFTDutchAuction_ERC20Bids");
    const nftDutchAuction_ERC20Bids = await nftDutchAuction_ERC20BidsFactory.deploy(myERC721.address,myERC20.address,0,500,10,25);
    ;

    return {nftDutchAuction_ERC20Bids, owner, otherAccount,thirdAccount,myERC20,myERC721};
  }

  describe("Deployment", function () {

        it("Should mint correctly", async function () {
            const {nftDutchAuction_ERC20Bids, owner, otherAccount,thirdAccount,myERC20,myERC721} = await loadFixture(deployNFTDutchAuction_ERC20BidsFixture);
            await myERC721.pubmint(otherAccount.address, 0);
            await myERC20.transfer(otherAccount.address, 500);
            expect(await myERC20.totalSupply()).to.equal(10000);
            expect(await myERC20.balanceOf(otherAccount.address)).to.equal(500);
        });

        it("Correct bid", async function () {
            const {nftDutchAuction_ERC20Bids, owner, otherAccount,thirdAccount,myERC20,myERC721} = await loadFixture(deployNFTDutchAuction_ERC20BidsFixture);
            await myERC721.pubmint(otherAccount.address, 0);
            await myERC20.transfer(otherAccount.address, 800);
            await myERC20.approve(nftDutchAuction_ERC20Bids.address,800);
            await nftDutchAuction_ERC20Bids.bid({value:750});
        });

        it("bid lower than reservePrice should be rejected", async function () {
            const {nftDutchAuction_ERC20Bids, owner, otherAccount,thirdAccount,myERC20,myERC721} = await loadFixture(deployNFTDutchAuction_ERC20BidsFixture);
            await myERC721.pubmint(otherAccount.address, 0);
            await myERC20.transfer(otherAccount.address, 800);
            await expect(nftDutchAuction_ERC20Bids.bid({ value: 450, })).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Your value is lower than reservePrice'");

        });


    });




});
