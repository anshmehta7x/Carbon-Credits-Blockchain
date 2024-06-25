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

    function giveCredits(address _receiver, uint256 _amount) public onlyVerifier {
        mint(_receiver, _amount);
    }

    function takeCredits(address _receiver, uint256 _amount) public onlyRegulator {
        burn(_receiver, _amount);
    }
}
