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
        const { basicDutchAuction, owner, secondAccount } = await loadFixture(deployBasicDutchAuctionFixture);


         await expect(basicDutchAuction.bid({ value: 450, })).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Your value is lower than reservePrice'");
        });


    });
    it("bid higher than reservePrice should be accepted", async function() {
          const { basicDutchAuction, owner, secondAccount } = await loadFixture(deployBasicDutchAuctionFixture);


          await expect(basicDutchAuction.bid({ value: 725, })).eventually.to.ok;

      });

    it("rejects second bid", async function() {
            const { basicDutchAuction, owner, secondAccount } = await loadFixture(deployBasicDutchAuctionFixture);


            await expect(basicDutchAuction.bid({ value: 725, })).eventually.to.ok;
            // block 2
            await expect(basicDutchAuction.bid({ value: 750, })).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'The commodity has been bought'");
        });

    it("reject a finalize when not accepted a bid", async () => {
            const { basicDutchAuction, owner, secondAccount } = await loadFixture(deployBasicDutchAuctionFixture);

            // block 1
            await expect(basicDutchAuction.finalize()).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'auction has stopped or auction is going'");
        });

    it("accept a finalize when accepted a bid", async () => {
            const { basicDutchAuction, owner, secondAccount } = await loadFixture(deployBasicDutchAuctionFixture);

            // block 1
            await expect(basicDutchAuction.bid({ value: 725, })).eventually.to.ok;
            // block 2
            await expect(basicDutchAuction.finalize()).eventually.to.ok;
        });


        it("reject a finalize when not accepted a valid bid", async () => {
                const { basicDutchAuction, owner, secondAccount } = await loadFixture(deployBasicDutchAuctionFixture);

                // block 1
                await expect(basicDutchAuction.bid({ value: 450, })).eventually.to
                .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Your value is lower than reservePrice'");

                // block 2
                await expect(basicDutchAuction.finalize()).eventually.to
                .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'auction has stopped or auction is going'");

            });
    it("doesn't reject a second finalize", async () => {
            const { basicDutchAuction, owner, secondAccount } = await loadFixture(deployBasicDutchAuctionFixture);

            // block 1
            await expect(basicDutchAuction.bid({ value: 725, })).eventually.to.ok;
            // block 2
            await expect(basicDutchAuction.finalize()).eventually.to.ok;
            // block 3
            await expect(basicDutchAuction.finalize()).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'auction has stopped or auction is going'");

        });
    it("accept a bid correctly on the last round", async () => {
            const { basicDutchAuction, owner, secondAccount } = await loadFixture(deployBasicDutchAuctionFixture);

            // block 1-8
            for (let index = 0; index < 8; index++) {
                await ethers.provider.send("hardhat_mine", []);
              }

            // block 9
            await expect(basicDutchAuction.bid({ value: 750, })).eventually.to.ok;

        });
    it("rejects a bid after the last round", async () => {
            const { basicDutchAuction, owner, secondAccount } = await loadFixture(deployBasicDutchAuctionFixture);

            // block 1-9
            for (let index = 0; index < 9; index++) {
                await ethers.provider.send("hardhat_mine", []);
              }

            // block 10
            await expect(basicDutchAuction.bid({ value: 750, })).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'out of block number'");

        });
    it("rejects a bid after the last round", async () => {
            const { basicDutchAuction, owner, secondAccount } = await loadFixture(deployBasicDutchAuctionFixture);

            // block 1-9
            for (let index = 0; index < 9; index++) {
                await ethers.provider.send("hardhat_mine", []);
              }

            // block 10
            await expect(basicDutchAuction.bid({ value: 750, })).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'out of block number'");

            // block 11
            await expect(basicDutchAuction.finalize()).eventually.to
            .rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'auction has stopped or auction is going'");

        });

      it("doesn't reject a finalize after expiration", async () => {
              const { basicDutchAuction, owner, secondAccount } = await loadFixture(deployBasicDutchAuctionFixture);

              // block 1
              await expect(basicDutchAuction.bid({ value: 725, })).eventually.to.ok;

              // block 2-14
              for (let index = 0; index < 13; index++) {
                  await ethers.provider.send("hardhat_mine", []);
                }

              // block 15
              await expect(basicDutchAuction.finalize()).eventually.to.ok;
          });


});
