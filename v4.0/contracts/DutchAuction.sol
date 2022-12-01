// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DutchAuction {
    address private ownerAddress;
    address private winnerAddress;
    uint256 private beginBlockNum;

    uint256 private reservePrice;
    uint256 private numBlocksAuctionOpen;
    uint256 private offerPriceDecrement;

    uint256 private winningBid;
    //address private judgeAddress;
    bool private endAuction = false;
    bool private finalized = false;

    constructor(uint256 _reservePrice, uint256 _numBlocksAuctionOpen, uint256 _offerPriceDecrement) {
        ownerAddress = msg.sender;
        reservePrice = _reservePrice;
        //judgeAddress = judgeAddress;
        numBlocksAuctionOpen = _numBlocksAuctionOpen;
        offerPriceDecrement = _offerPriceDecrement;
        beginBlockNum = block.number;
    }

    function getAuctionState() public view returns (uint256, uint256, uint256, uint256, uint256, bool, bool) {
        return (reservePrice, numBlocksAuctionOpen, offerPriceDecrement, winningBid, beginBlockNum, finalized, endAuction);
    }

    function bid() public payable {
        require(!finalized);
        require(!endAuction);
        require(block.number < beginBlockNum + numBlocksAuctionOpen);
        require(msg.value >= reservePrice + (beginBlockNum + numBlocksAuctionOpen - block.number) * offerPriceDecrement);
        endAuction = true;
        winnerAddress = msg.sender;
        winningBid = msg.value;

    }

    function finalize() public {
        require(endAuction);
        require(!finalized);
        require(msg.sender == winnerAddress);
        (bool success, ) = ownerAddress.call{value: winningBid}('');
        require(success, 'Transfer bid value failed.');
        finalized = true;
    }

    function refund() public {
        require(endAuction);
        require(!finalized);
        (bool success, ) = winnerAddress.call{value: winningBid}('');
        require(success, 'Transfer bid value failed.');
        finalized = true;
    }

    function nop() public returns (bool) {
        return true;
    }
}

