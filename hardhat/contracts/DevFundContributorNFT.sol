// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DevFundContributorNFT is ERC721 {
    address public owner;
    address public devFundAddress;
    uint256 private _nextTokenId;

    constructor() ERC721("DevFundContributorNFT", "DFC") {
        owner = msg.sender;
    }

    function setDevFundAddress(address _devFundAddress) public {
        require(msg.sender == owner, "only owner can set the address");
        devFundAddress = _devFundAddress;
    }

    function awardNft(address user) public {
        require(
            msg.sender == devFundAddress,
            "mint only works from devFundAddress"
        );
        uint256 tokenId = _nextTokenId++;
        _mint(user, tokenId);
    }
}
