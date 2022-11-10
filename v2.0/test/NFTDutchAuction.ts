import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTDutchAuction", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployNFTDutchAuctionFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, thirdAccount] = await ethers.getSigners();

    const nftDutchAuctionFactory = await ethers.getContractFactory("NFTDutchAuction");
    const nftDutchAuction = await nftDutchAuctionFactory.deploy();
    await nftDutchAuction.initialize(owner.address,0,500,10,25);

    return { nftDutchAuction, owner, otherAccount};
  }

  describe("Deployment", function () {
    it("reject Invalid ERC721 tokenID", async function () {
      const {nftDutchAuction, owner, otherAccount} = await loadFixture(deployNFTDutchAuctionFixture);
      await expect(nftDutchAuction.transferFrom(owner.address,otherAccount.address,1)).eventually.to
      .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'ERC721: invalid token ID'");
    });

    it("correct ERC721 tokenID", async function () {
          const {nftDutchAuction, owner, otherAccount} = await loadFixture(deployNFTDutchAuctionFixture);
          await nftDutchAuction.transferFrom(owner.address,otherAccount.address,0);
    });

    it("Transform incorrect owner", async function () {
          const {nftDutchAuction, owner, otherAccount} = await loadFixture(deployNFTDutchAuctionFixture);
          await expect(nftDutchAuction.transferFrom(otherAccount.address,owner.address,0)).eventually.to
          .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'ERC721: transfer from incorrect owner'");
    });

    it("approve otherAccount", async function () {
      const {nftDutchAuction, owner, otherAccount} = await loadFixture(deployNFTDutchAuctionFixture);
      await nftDutchAuction.approve(otherAccount.address, 0);
    });

    it("Cannot approve current owner", async function () {
      const {nftDutchAuction, owner, otherAccount} = await loadFixture(deployNFTDutchAuctionFixture);
      await expect(nftDutchAuction.approve(owner.address, 0)).eventually.to
      .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'ERC721: approval to current owner'");
    });

    it("Should set the right reservePrice", async function () {
      const {nftDutchAuction, owner, otherAccount} = await loadFixture(deployNFTDutchAuctionFixture);

    });
    it("Should set the right numBlocksActionOpen", async function () {
      const {nftDutchAuction, owner, otherAccount} = await loadFixture(deployNFTDutchAuctionFixture);
    });
    it("Should set the right offerPriceDecrement", async function () {
      const {nftDutchAuction, owner, otherAccount} = await loadFixture(deployNFTDutchAuctionFixture);
    });

    it("Should set the right owner", async function () {
      const { nftDutchAuction, owner } = await loadFixture(deployNFTDutchAuctionFixture);
    });

    it("bid lower than reservePrice should be rejected", async function() {
        const { nftDutchAuction, owner, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);

        await expect(nftDutchAuction.bid({ value: 450, })).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Your value is lower than reservePrice'");
        });
    });
    it("bid higher than reservePrice should be accepted", async function() {
        const { nftDutchAuction, owner, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);
        await expect(nftDutchAuction.bid({ value: 725, })).eventually.to.ok;
    });

    it("rejects if the product has been bought", async function() {
        const { nftDutchAuction, owner, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);
        await expect(nftDutchAuction.bid({ value: 725, })).eventually.to.ok;
        await expect(nftDutchAuction.bid({ value: 750, })).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'The commodity has been bought'");
    });

    it("reject a finalize when auction is not finish", async function()  {
        const { nftDutchAuction, owner, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);

        await expect(nftDutchAuction.finalize()).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'the auction is going'");
    });

    it("reject a refund when auction is not finish", async function()  {
        const { nftDutchAuction, owner, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);
        await expect(nftDutchAuction.refund(400)).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'the auction is going'");
    });

    it("reject a refund when higher than winningbid", async function()  {
        const { nftDutchAuction, owner, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);
        await expect(nftDutchAuction.bid({ value: 725, })).eventually.to.ok;
        await expect(nftDutchAuction.refund(800)).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'refund must lower than winningBid'");
    });

    it("success a finalize", async function() {
        const { nftDutchAuction, owner, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);
        await expect(nftDutchAuction.bid({ value: 725, })).eventually.to.ok;
        await expect(nftDutchAuction.finalize()).eventually.to.ok;
    });

    it("reject a finalize when not accepted a valid bid", async function() {
        const { nftDutchAuction, owner, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);
        await expect(nftDutchAuction.bid({ value: 450, })).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Your value is lower than reservePrice'");
        await expect(nftDutchAuction.finalize()).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'the auction is going'");

    });
    it("Only One finalize", async function() {
        const { nftDutchAuction, owner, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);
        await expect(nftDutchAuction.bid({ value: 725, })).eventually.to.ok;
        await expect(nftDutchAuction.finalize()).eventually.to.ok;
        await expect(nftDutchAuction.finalize()).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'the auction has finalized'");

    });

    it("Only One refund", async function() {
        const { nftDutchAuction, owner, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);
        await expect(nftDutchAuction.bid({ value: 725, })).eventually.to.ok;
        await expect(nftDutchAuction.refund(400)).eventually.to.ok;
        await expect(nftDutchAuction.refund(400)).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'the auction has stopped'");

    });
    it("accepted if not out of round", async function() {
        const { nftDutchAuction, owner, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);
        for (let index = 0; index < 8; index++) {
            await expect(nftDutchAuction.bid({value:0})).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Your value is lower than reservePrice'");
        }
        await expect(nftDutchAuction.bid({ value: 750, })).eventually.to.ok;

    });
    it("rejects if out of round", async function() {
        const { nftDutchAuction, owner, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);
        for (let index = 0; index < 9; index++) {
            await expect(nftDutchAuction.bid({value:0})).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Your value is lower than reservePrice'");
        }
        await expect(nftDutchAuction.bid({ value: 750, })).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'out of block number'");
    });
    it("rejects a bid after the last round", async () => {
        const { nftDutchAuction, owner, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);
        for (let index = 0; index < 9; index++) {
            await expect(nftDutchAuction.bid({value:0})).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Your value is lower than reservePrice'");
        }

        await expect(nftDutchAuction.bid({ value: 750, })).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'out of block number'");
        await expect(nftDutchAuction.finalize()).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'the auction is going'");
    });

    it("doesn't reject a finalize after expiration", async () => {
        const { nftDutchAuction, owner, otherAccount } = await loadFixture(deployNFTDutchAuctionFixture);
        await expect(nftDutchAuction.bid({ value: 725, })).eventually.to.ok;
        for (let index = 0; index < 13; index++) {
            await ethers.provider.send("hardhat_mine", []);
        }

        await expect(nftDutchAuction.finalize()).eventually.to.ok;
    });

});
