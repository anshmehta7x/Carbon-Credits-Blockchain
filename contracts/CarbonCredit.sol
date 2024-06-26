// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCredit is ERC20, Ownable {
    constructor(address _owner) ERC20("CarbonCredit", "CRC") Ownable(_owner) {
        _mint(_owner, 0);
    }

    function mint(address to, uint256 amount) internal  {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) internal  {
        _burn(from, amount);
    }
}
