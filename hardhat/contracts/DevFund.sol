// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./DevFundContributorNFT.sol";

contract Devfund {
    address payable public owner;
    DevFundContributorNFT public devFundContributorNFT;
    IERC20 public usdcToken;

    event CampaignCreated(
        string title,
        uint256 usdcBalance,
        uint256 ethBalance,
        address owner,
        string gitUrl,
        string description,
        // string category,
        uint256 fundingGoal,
        uint256 donationCount,
        uint256 endDate,
        string status
    );
    event USDCFunded(uint256 amount, uint256 campaignNo);
    event EthFunded(uint256 amount, uint256 campaignNo);
    event USDCWithdrawn(uint256 amount, uint256 campaignNo);
    event EthWithdrawn(uint256 amount, uint256 campaignNo);

    struct Campaign {
        string title;
        uint256 usdcBalance;
        uint256 ethBalance;
        address owner;
        string gitUrl;
        string description;
        // string category;
        uint256 fundingGoal;
        uint256 donationCount;
        uint256 endDate;
        string status;
    }

    Campaign[] public campaigns;

    constructor(address _usdcAddress, address nftAddress) {
        owner = payable(msg.sender);
        usdcToken = IERC20(_usdcAddress);
        devFundContributorNFT = DevFundContributorNFT(nftAddress);
    }

    function createCampaign(
        string calldata _title,
        string calldata _gitUrl,
        string calldata _description,
        // string calldata _category,
        uint256 _fundingGoal
    ) public returns (bool) {
        campaigns.push(
            Campaign(
                _title,
                0,
                0,
                msg.sender,
                _gitUrl,
                _description,
                // _category,
                _fundingGoal,
                0,
                0,
                "active"
            )
        );
        emit CampaignCreated(
            _title,
            0,
            0,
            msg.sender,
            _gitUrl,
            _description,
            // _category,
            _fundingGoal,
            0,
            0,
            "active"
        );
        return true;
    }

    function fundUSDC(uint256 _amount, uint256 campaignNo) public {
        require(_amount > 0, "You need to contribute some USDC");
        uint256 allowance = usdcToken.allowance(msg.sender, address(this));
        require(_amount <= allowance, "Check the token allowance");

        require(
            keccak256(abi.encode(campaigns[campaignNo].status)) ==
                keccak256(abi.encode("active")),
            "Campaign is not active"
        );
        require(
            campaigns[campaignNo].endDate >= block.timestamp,
            "Campaign has ended"
        );

        campaigns[campaignNo].usdcBalance += _amount;
        campaigns[campaignNo].donationCount += 1;
        usdcToken.transferFrom(msg.sender, address(this), _amount);
        emit USDCFunded(_amount, campaignNo);

        // award nft to msg.sender
        devFundContributorNFT.awardNft(msg.sender);
    }

    function fundEth(uint256 campaignNo) public payable {
        require(msg.value > 0, "You need to send some Ether");
        require(
            keccak256(abi.encode(campaigns[campaignNo].status)) ==
                keccak256(abi.encode("active")),
            "Campaign is not active"
        );
        require(
            campaigns[campaignNo].endDate >= block.timestamp,
            "Campaign has ended"
        );

        campaigns[campaignNo].ethBalance += msg.value;
        campaigns[campaignNo].donationCount += 1;
        emit EthFunded(msg.value, campaignNo);

        // award nft to msg.sender
        devFundContributorNFT.awardNft(msg.sender);
    }

    function withdrawUSDC(uint256 campaignNo) public {
        require(
            msg.sender == campaigns[campaignNo].owner,
            "Only Campaign owner can withdraw"
        );

        usdcToken.transfer(msg.sender, campaigns[campaignNo].usdcBalance);
        campaigns[campaignNo].usdcBalance = 0;
        emit USDCWithdrawn(campaigns[campaignNo].usdcBalance, campaignNo);
    }

    function withdrawEth(uint256 campaignNo) public {
        require(
            msg.sender == campaigns[campaignNo].owner,
            "Only Campaign owner can withdraw"
        );

        payable(msg.sender).transfer(campaigns[campaignNo].ethBalance);
        campaigns[campaignNo].ethBalance = 0;
        emit EthWithdrawn(campaigns[campaignNo].ethBalance, campaignNo);
    }

    function getCampaignFundInUSD(
        uint256 campaignNo
    ) public view returns (uint256, uint256) {
        return (
            campaigns[campaignNo].ethBalance,
            campaigns[campaignNo].usdcBalance
        );
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
