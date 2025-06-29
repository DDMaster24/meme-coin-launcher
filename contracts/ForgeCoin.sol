// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ForgeCoin is ERC20 {
    constructor() ERC20("Forge Coin", "FCC") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}
