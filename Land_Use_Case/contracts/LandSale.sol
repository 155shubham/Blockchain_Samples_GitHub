// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;

import "./Land.sol";

contract LandSale is LandRegistration {

    struct BidDetail {
        uint256 highestBid;
        address highestBidder;
        mapping(address => uint) bids;
        address[] bidders;
    }

    mapping(uint256 => BidDetail) BidDetails;

    function bid(uint256 LandId) public payable {
        require(BidDetails[LandId].bids[msg.sender] + msg.value > BidDetails[LandId].highestBid, "can't bid, make a higher bid");  
        BidDetails[LandId].highestBidder = msg.sender;
        BidDetails[LandId].bidders.push(msg.sender);
        BidDetails[LandId].highestBid = BidDetails[LandId].bids[msg.sender] + msg.value;
        BidDetails[LandId].bids[msg.sender] += msg.value;
    }

    function acceptBid(uint256 LandId) public {
        payable(msg.sender).transfer(BidDetails[LandId].highestBid);

        for(uint256 i = 0; i < BidDetails[LandId].bidders.length; i++) {
            if(BidDetails[LandId].bidders[i] == BidDetails[LandId].highestBidder) {
                continue;
            }
            payable(BidDetails[LandId].bidders[i]).transfer(BidDetails[LandId].bids[BidDetails[LandId].bidders[i]]);
        }
        LandDetails[LandId].salesStatus = true;
    }

    /* 
        Added fallback() function with external modifier to revert the functions 
        which do not have arguments.

    */
    fallback() external {
        revert();
    }
}