// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./DevfundContributorNFT.sol";

contract Devfund {
    address payable public owner;
    DevFundContributorNFT public devFundContributorNFT;
    IERC20 public usdcToken;

    event ProjectCreated(
        string name,
        uint256 usdcBalance,
        uint256 ethBalance,
        address owner,
        string gitUrl
    );
    event USDCFunded(uint256 amount, uint256 projectNo);
    event EthFunded(uint256 amount, uint256 projectNo);
    event USDCWithdrawn(uint256 amount, uint256 projectNo);
    event EthWithdrawn(uint256 amount, uint256 projectNo);

    struct Project {
        string name;
        uint256 usdcBalance;
        uint256 ethBalance;
        address owner;
        string gitUrl;
        // write remaining properties
    }

    Project[] public projects;

    constructor(
        address _usdcAddress,
        address nftAddress,
        address _ethPriceDataFeed,
        address _usdcPriceDataFeed
    ) {
        owner = payable(msg.sender);
        usdcToken = IERC20(_usdcAddress);
        devFundContributorNFT = DevFundContributorNFT(nftAddress);
    }

    function createProject(
        string calldata _name,
        string calldata _gitUrl
    ) public returns (bool) {
        projects.push(Project(_name, 0, 0, msg.sender, _gitUrl));
        emit ProjectCreated(_name, 0, 0, msg.sender, _gitUrl);
        return true;
    }

    function fundUSDC(uint256 _amount, uint256 projectNo) public {
        require(_amount > 0, "You need to contribute some USDC");
        uint256 allowance = usdcToken.allowance(msg.sender, address(this));
        require(_amount <= allowance, "Check the token allowance");
        projects[projectNo].usdcBalance += _amount;
        usdcToken.transferFrom(msg.sender, address(this), _amount);
        emit USDCFunded(_amount, projectNo);

        // award nft to msg.sender
        devFundContributorNFT.awardNft(msg.sender);
    }

    function fundEth(uint256 projectNo) public payable {
        require(msg.value > 0, "You need to send some Ether");
        projects[projectNo].ethBalance += msg.value;
        emit EthFunded(msg.value, projectNo);

        // award nft to msg.sender
        devFundContributorNFT.awardNft(msg.sender);
    }

    function withdrawUSDC(uint256 projectNo) public {
        require(
            msg.sender == projects[projectNo].owner,
            "Only Project owner can withdraw"
        );

        usdcToken.transfer(msg.sender, projects[projectNo].usdcBalance);
        projects[projectNo].usdcBalance = 0;
        emit USDCWithdrawn(projects[projectNo].usdcBalance, projectNo);
    }

    function withdrawEth(uint256 projectNo) public {
        require(
            msg.sender == projects[projectNo].owner,
            "Only Project owner can withdraw"
        );

        payable(msg.sender).transfer(projects[projectNo].ethBalance);
        projects[projectNo].ethBalance = 0;
        emit EthWithdrawn(projects[projectNo].ethBalance, projectNo);
    }

    function getProjectFundInUSD(
        uint256 projectNo
    ) public view returns (uint256, uint256) {
        return (
            projects[projectNo].ethBalance,
            projects[projectNo].usdcBalance
        );
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
