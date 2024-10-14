// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./DevFundContributorNFT.sol";

contract DevFund {
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

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory campaignArray = new Campaign[](campaigns.length);

        for (uint256 i = 0; i < campaigns.length; i++) {
            campaignArray[i] = campaigns[i];
        }

        return campaignArray;
    }

    function createCampaign(
        string calldata _title,
        string calldata _gitUrl,
        string calldata _description,
        uint256 _fundingGoal,
        uint256 _endDate
    ) public returns (uint256) {
        uint256 campaignId = _createCampaign(
            _title,
            _gitUrl,
            _description,
            _fundingGoal,
            _endDate
        );
        _emitCampaignCreated(campaignId);
        return campaignId;
    }

    function _createCampaign(
        string calldata _title,
        string calldata _gitUrl,
        string calldata _description,
        uint256 _fundingGoal,
        uint256 _endDate
    ) private returns (uint256) {
        Campaign memory newCampaign = Campaign({
            title: _title,
            usdcBalance: 0,
            ethBalance: 0,
            owner: msg.sender,
            gitUrl: _gitUrl,
            description: _description,
            fundingGoal: _fundingGoal,
            donationCount: 0,
            endDate: _endDate,
            status: "active"
        });

        campaigns.push(newCampaign);
        return campaigns.length - 1;
    }

    function _emitCampaignCreated(uint256 campaignId) private {
        Campaign memory campaign = campaigns[campaignId];
        emit CampaignCreated(
            campaign.title,
            campaign.usdcBalance,
            campaign.ethBalance,
            campaign.owner,
            campaign.gitUrl,
            campaign.description,
            campaign.fundingGoal,
            campaign.donationCount,
            campaign.endDate,
            campaign.status
        );
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
