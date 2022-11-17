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

    const myERC20Factory = await ethers.getContractFactory("OfficalERC20");
    const myERC20 = await myERC20Factory.deploy();
    const nftDutchAuction_ERC20BidsFactory = await ethers.getContractFactory("NFTDutchAuction_ERC20Bids");
    const nftDutchAuction_ERC20Bids = await nftDutchAuction_ERC20BidsFactory.connect(owner).deploy(myERC721.address,myERC20.address,0,500,10,25);
    ;

    return {nftDutchAuction_ERC20Bids, owner, otherAccount,thirdAccount,myERC20,myERC721};
  }

  describe("Deployment", function () {

        it("Should mint correctly", async function () {
            const {nftDutchAuction_ERC20Bids, owner, otherAccount,thirdAccount,myERC20,myERC721} = await loadFixture(deployNFTDutchAuction_ERC20BidsFixture);
            await myERC721.pubmint(otherAccount.address, 0);
            await myERC20.pubmint(otherAccount.address,10000);
            expect(await myERC20.totalSupply()).to.equal(10000);
        });

        it("Correct bid", async function () {
            const {nftDutchAuction_ERC20Bids, owner, otherAccount,thirdAccount,myERC20,myERC721} = await loadFixture(deployNFTDutchAuction_ERC20BidsFixture);
            await myERC721.pubmint(otherAccount.address, 0);
            await myERC20.pubmint(otherAccount.address, 800);
            await myERC20.connect(otherAccount).approve(nftDutchAuction_ERC20Bids.address,800);
            await nftDutchAuction_ERC20Bids.connect(otherAccount).bid({value:750});
        });

        it("bid lower than reservePrice should be rejected", async function () {
            const {nftDutchAuction_ERC20Bids, owner, otherAccount,thirdAccount,myERC20,myERC721} = await loadFixture(deployNFTDutchAuction_ERC20BidsFixture);
            await myERC721.pubmint(otherAccount.address, 0);
            await myERC20.pubmint(otherAccount.address, 800);
            await expect(nftDutchAuction_ERC20Bids.connect(otherAccount).bid({ value: 450, })).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Your value is lower than reservePrice'");
        });

        it("rejects if the product has been bought", async function () {
            const {nftDutchAuction_ERC20Bids, owner, otherAccount,thirdAccount,myERC20,myERC721} = await loadFixture(deployNFTDutchAuction_ERC20BidsFixture);
            await myERC721.pubmint(otherAccount.address, 0);
            await myERC20.pubmint(otherAccount.address, 1800);
            await myERC20.connect(otherAccount).approve(nftDutchAuction_ERC20Bids.address,1500);
            await expect(nftDutchAuction_ERC20Bids.connect(otherAccount).bid({ value: 725, })).eventually.to.ok;
            await expect(nftDutchAuction_ERC20Bids.connect(otherAccount).bid({ value: 750, })).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'The commodity has been bought'");
        });

        it("reject a finalize when auction is not finish", async function () {
            const {nftDutchAuction_ERC20Bids, owner, otherAccount,thirdAccount,myERC20,myERC721} = await loadFixture(deployNFTDutchAuction_ERC20BidsFixture);
            await expect(nftDutchAuction_ERC20Bids.finalize()).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'the auction is going'");
        });

        it("reject a refund when auction is not finish", async function () {
            const {nftDutchAuction_ERC20Bids, owner, otherAccount,thirdAccount,myERC20,myERC721} = await loadFixture(deployNFTDutchAuction_ERC20BidsFixture);
            await expect(nftDutchAuction_ERC20Bids.refund(400)).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'the auction is going'");
        });

        it("reject a refund when higher than winningbid", async function () {
            const {nftDutchAuction_ERC20Bids, owner, otherAccount,thirdAccount,myERC20,myERC721} = await loadFixture(deployNFTDutchAuction_ERC20BidsFixture);
            await myERC721.pubmint(otherAccount.address, 0);
            await myERC20.pubmint(otherAccount.address, 1800);
            await myERC20.connect(otherAccount).approve(nftDutchAuction_ERC20Bids.address,1800);
            await nftDutchAuction_ERC20Bids.connect(otherAccount).bid({value:725});
            await expect(nftDutchAuction_ERC20Bids.connect(otherAccount).refund(800)).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'refund must lower than winningBid'");
        });

        it("success a finalize", async function () {
            const {nftDutchAuction_ERC20Bids, owner, otherAccount,thirdAccount,myERC20,myERC721} = await loadFixture(deployNFTDutchAuction_ERC20BidsFixture);
            await myERC721.pubmint(otherAccount.address, 0);
            await myERC20.pubmint(otherAccount.address, 1800);
            await myERC20.connect(otherAccount).approve(nftDutchAuction_ERC20Bids.address,1800);
            await myERC20.connect(owner).approve(otherAccount.address, 1800);

            await nftDutchAuction_ERC20Bids.connect(otherAccount).bid({value:750});
            expect(await myERC20.allowance(owner.address,otherAccount.address)).equal(1800);
            await nftDutchAuction_ERC20Bids.connect(otherAccount).finalize();
        });


    });




});
