// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;


contract Faucet {
    uint256 public numberOfFunders;
    mapping(uint256 => address) public lutFunders;
    mapping(address => bool) public funders;

    modifier limitWithdraw(uint256 amount) {
        require(amount < 1 * (10**18),"Can not withdraw more than 1 ETH");
        _;
    }

    function addFunds() external payable {
        address funder = msg.sender;

        if(!funders[funder]) {
            uint256 index = numberOfFunders++;
            funders[funder] = true;
            lutFunders[index] = funder;
        }
        
    }


    function fetFundersIndex(uint256 index) external view returns (address) {
        return lutFunders[index];
    }

    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numberOfFunders);

        for (uint256 index = 0; index < numberOfFunders; index++) {
            _funders[index] = lutFunders[index];
        }

        return _funders;
    }

    function withdraw(uint256 amount) external limitWithdraw(amount) {
        require(amount <= 1 * (10**18),"Can not withdraw more than 1 ETH");
        payable(msg.sender).transfer(amount); 
    }
}