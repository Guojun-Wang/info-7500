// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract NFTDutchAuction is ERC721, Initializable{

    address payable ownerAddress;
    address payable winnerAddress;
    address erc721TokenAddress;
    uint startBlockNumber;
    //ERC721 nft;

    uint256 reservePrice;
    uint256 numBlocksActionOpen;
    uint256 offerPriceDecrement;
    uint256 nftTokenId;

    uint winningBid;
    bool endAuction;
    bool finalized;

    constructor() ERC721("NFTDutchAuction", "NFT"){
//        reservePrice = _reservePrice;
//        numBlocksActionOpen = _numBlocksAuctionOpen;
//        offerPriceDecrement = _offerPriceDecrement;
//        ownerAddress = payable(msg.sender);
//        startBlockNumber = block.number;
//        nftTokenId = _nftTokenId;
//        erc721TokenAddress = _erc721TokenAddress;
//        _mint(erc721TokenAddress,nftTokenId);
        //nft = ERC721(_erc721TokenAddress);
    }

    function initialize(address _erc721TokenAddress,
                        uint256 _nftTokenId,
                        uint _reservePrice,
                        uint256 _numBlocksAuctionOpen,
                        uint _offerPriceDecrement) public initializer {
        reservePrice = _reservePrice;
        numBlocksActionOpen = _numBlocksAuctionOpen;
        offerPriceDecrement = _offerPriceDecrement;
        ownerAddress = payable(msg.sender);
        startBlockNumber = block.number;
        nftTokenId = _nftTokenId;
        erc721TokenAddress = _erc721TokenAddress;
        _mint(erc721TokenAddress,nftTokenId);
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
        require(endAuction, "the auction is going");
        require(!finalized, "the auction has finalized");
        require(msg.sender == winnerAddress, "sender Address os not equal to winnerAddress");
        finalized = true;
        ownerAddress.transfer(winningBid);
        transferFrom(erc721TokenAddress, winnerAddress, nftTokenId);
    }

    function refund(uint256 refundAmount) public {
        require(endAuction, "the auction is going");
        require(!finalized, "the auction has stopped");
        uint a = uint(refundAmount);
        require(a<=winningBid, "refund must lower than winningBid");
        finalized = true;
        winnerAddress.transfer(refundAmount);
    }


}
