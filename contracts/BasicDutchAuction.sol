//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract BasicDutchAuction {
    address payable ownerAddress;
    address payable winnerAddress;
    uint startBlockNumber;

    uint256 reservePrice;
    uint256 numBlocksActionOpen;
    uint256 offerPriceDecrement;

    uint winningBid;
    bool endAuction;
    bool finalized;


    constructor(uint256 _reservePrice, uint256 _numBlocksAuctionOpen, uint256 _offerPriceDecrement) {
        reservePrice = _reservePrice;
        numBlocksActionOpen = _numBlocksAuctionOpen;
        offerPriceDecrement = _offerPriceDecrement;
        ownerAddress = payable(msg.sender);
        startBlockNumber = block.number;
    }

    function bid() public payable returns(address) {
        require(!endAuction,"The commodity has been bought");
        require(block.number < (startBlockNumber + numBlocksActionOpen),"out of block number");
        require(msg.value >= (reservePrice + (offerPriceDecrement * (startBlockNumber + numBlocksActionOpen - block.number))),"Your value is lower than reservePrice");
        endAuction = true;
        winnerAddress = payable(msg.sender);
        winningBid = msg.value;
        return winnerAddress;

        //return address(0);
    }

    function finalize() public {
        require(endAuction && !finalized, "auction has stopped or auction is going");
        require(msg.sender == winnerAddress, "sender Address os not equal to winnerAddress");
        finalized = true;
        ownerAddress.transfer(winningBid);
    }

    function refund(uint256 refundAmount) public {
        require(endAuction && !finalized, "auction has stopped or auction is going");
        finalized = true;
        winnerAddress.transfer(refundAmount);
    }

    function getBlockNumber() public view returns (uint256){
        return block.number;
    }
}
