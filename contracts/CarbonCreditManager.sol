// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./CarbonCredit.sol";

contract CarbonCreditManager is CarbonCredit{
    address public verifier;
    address public regulator;

    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }

    modifier onlyRegulator() {
        require(msg.sender == regulator, "Only regulator can call this function");
        _;
    }

    constructor(address _verifier, address _regulator) CarbonCredit(msg.sender) {
        verifier = _verifier;
        regulator = _regulator;
    }

    function getAuthority() public view returns (address[] memory) {
        address[] memory authority = new address[](2);
        authority[0] = verifier;
        authority[1] = regulator;
        return authority;
    }


    function giveCredits(address _receiver, uint256 _amount) public onlyVerifier {
        mint(_receiver, _amount);
    }

    function takeCredits(address _receiver, uint256 _amount) public onlyRegulator {
        burn(_receiver, _amount);
    }

    function purchaseCredits() public payable{
        require(msg.value>1 ether, "Not enough payment");
        mint(msg.sender, msg.value / 10**18);
        withdrawal(msg.value);
    }


    function withdrawal(uint256 _value) private {

        payable(owner()).transfer(_value);
    }
}
