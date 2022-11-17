// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract NFTDutchAuction_ERC20Bids{

    address payable public ownerAddress;
    address payable public winnerAddress;
    address erc721TokenAddress;
    uint startBlockNumber;
    IERC20 private tokenAddress;
    IERC721 private nftTokenAddress;

    uint256 reservePrice;
    uint256 numBlocksActionOpen;
    uint256 offerPriceDecrement;
    uint256 nftTokenId;

    uint winningBid;
    bool endAuction;
    bool finalized;


    constructor(IERC721 _erc721TokenAddress,
                IERC20 _tokenAddress,
                uint256 _nftTokenId,
                uint _reservePrice,
                uint256 _numBlocksAuctionOpen,
                uint _offerPriceDecrement){
        reservePrice = _reservePrice;
        numBlocksActionOpen = _numBlocksAuctionOpen;
        offerPriceDecrement = _offerPriceDecrement;
        ownerAddress = payable(msg.sender);
        startBlockNumber = block.number;
        nftTokenId = _nftTokenId;
        nftTokenAddress = _erc721TokenAddress;
        tokenAddress = _tokenAddress;
    }

    function bid() public payable returns(address) {
        require(!endAuction,"The commodity has been bought");
        require(block.number < (startBlockNumber + numBlocksActionOpen),"out of block number");
        require(msg.value >= (reservePrice + (offerPriceDecrement * (startBlockNumber + numBlocksActionOpen - block.number))),"Your value is lower than reservePrice");
        require(tokenAddress.balanceOf(msg.sender) >= msg.value, "Have no enough value");
        endAuction = true;
        winnerAddress = payable(msg.sender);
        winningBid = msg.value;
        tokenAddress.transferFrom(msg.sender, address(this), msg.value);
        return winnerAddress;

        //return address(0);
    }
    function finalize() public {
        require(endAuction, "the auction is going");
        require(!finalized, "the auction has finalized");
        require(msg.sender == winnerAddress, "sender Address os not equal to winnerAddress");
        finalized = true;
        //ownerAddress.transfer(winningBid);
        tokenAddress.transfer(ownerAddress,winningBid);
        //transferFrom(erc721TokenAddress, winnerAddress, nftTokenId);
        //nftTokenAddress.transferFrom(ownerAddress,winnerAddress,nftTokenId);
    }

    function refund(uint256 refundAmount) public {
        require(endAuction, "the auction is going");
        require(!finalized, "the auction has stopped");
        uint a = uint(refundAmount);
        require(a<=winningBid, "refund must lower than winningBid");
        finalized = true;
        tokenAddress.transferFrom(address(this), msg.sender, refundAmount);
        //winnerAddress.transfer(refundAmount);
    }


}
