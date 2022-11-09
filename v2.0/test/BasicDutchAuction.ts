import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BasicDutchAuction", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBasicDutchAuctionFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, thirdAccount] = await ethers.getSigners();

    const basicDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
    const basicDutchAuction = await basicDutchAuctionFactory.deploy(500,10,25);

    return { basicDutchAuction, owner, otherAccount};
  }

  describe("Deployment", function () {
    it("Should set the right reservePrice", async function () {
      const {basicDutchAuction, owner, otherAccount} = await loadFixture(deployBasicDutchAuctionFixture);

    });
    it("Should set the right numBlocksActionOpen", async function () {
      const {basicDutchAuction, owner, otherAccount} = await loadFixture(deployBasicDutchAuctionFixture);
    });
    it("Should set the right offerPriceDecrement", async function () {
      const {basicDutchAuction, owner, otherAccount} = await loadFixture(deployBasicDutchAuctionFixture);
    });

    it("Should set the right owner", async function () {
      const { basicDutchAuction, owner } = await loadFixture(deployBasicDutchAuctionFixture);
    });

    it("bid lower than reservePrice should be rejected", async function() {
        const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);

        await expect(basicDutchAuction.bid({ value: 450, })).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Your value is lower than reservePrice'");
        });
    });
    it("bid higher than reservePrice should be accepted", async function() {
        const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);
        await expect(basicDutchAuction.bid({ value: 725, })).eventually.to.ok;
    });

    it("rejects if the product has been bought", async function() {
        const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);
        await expect(basicDutchAuction.bid({ value: 725, })).eventually.to.ok;
        await expect(basicDutchAuction.bid({ value: 750, })).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'The commodity has been bought'");
    });

    it("reject a finalize when auction is not finish", async function()  {
        const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);

        await expect(basicDutchAuction.finalize()).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'the auction is going'");
    });

    it("reject a refund when auction is not finish", async function()  {
        const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);
        await expect(basicDutchAuction.refund(400)).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'the auction is going'");
    });

    it("reject a refund when higher than winningbid", async function()  {
        const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);
        await expect(basicDutchAuction.bid({ value: 725, })).eventually.to.ok;
        await expect(basicDutchAuction.refund(800)).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'refund must lower than winningBid'");
    });

    it("success a finalize", async function() {
        const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);
        await expect(basicDutchAuction.bid({ value: 725, })).eventually.to.ok;
        await expect(basicDutchAuction.finalize()).eventually.to.ok;
    });

    it("reject a finalize when not accepted a valid bid", async function() {
        const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);
        await expect(basicDutchAuction.bid({ value: 450, })).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Your value is lower than reservePrice'");
        await expect(basicDutchAuction.finalize()).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'the auction is going'");

    });
    it("Only One finalize", async function() {
        const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);
        await expect(basicDutchAuction.bid({ value: 725, })).eventually.to.ok;
        await expect(basicDutchAuction.finalize()).eventually.to.ok;
        await expect(basicDutchAuction.finalize()).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'the auction has finalized'");

    });

    it("Only One refund", async function() {
        const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);
        await expect(basicDutchAuction.bid({ value: 725, })).eventually.to.ok;
        await expect(basicDutchAuction.refund(400)).eventually.to.ok;
        await expect(basicDutchAuction.refund(400)).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'the auction has stopped'");

    });
    it("accepted if not out of round", async function() {
        const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);
        for (let index = 0; index < 8; index++) {
            await expect(basicDutchAuction.bid({value:0})).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Your value is lower than reservePrice'");
        }
        await expect(basicDutchAuction.bid({ value: 750, })).eventually.to.ok;

    });
    it("rejects if out of round", async function() {
        const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);
        for (let index = 0; index < 9; index++) {
            await expect(basicDutchAuction.bid({value:0})).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Your value is lower than reservePrice'");
        }
        await expect(basicDutchAuction.bid({ value: 750, })).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'out of block number'");
    });
    it("rejects a bid after the last round", async () => {
        const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);
        for (let index = 0; index < 9; index++) {
            await expect(basicDutchAuction.bid({value:0})).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Your value is lower than reservePrice'");
        }

        await expect(basicDutchAuction.bid({ value: 750, })).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'out of block number'");
        await expect(basicDutchAuction.finalize()).eventually.to
        .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'the auction is going'");
    });

    it("doesn't reject a finalize after expiration", async () => {
        const { basicDutchAuction, owner, otherAccount } = await loadFixture(deployBasicDutchAuctionFixture);
        await expect(basicDutchAuction.bid({ value: 725, })).eventually.to.ok;
        for (let index = 0; index < 13; index++) {
            await ethers.provider.send("hardhat_mine", []);
        }

        await expect(basicDutchAuction.finalize()).eventually.to.ok;
    });

});
