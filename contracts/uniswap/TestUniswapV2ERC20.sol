// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UniswapV2ERC20.sol";

contract TestUniswapV2ERC20 is UniswapV2ERC20 {
    function mintTokens(address to, uint value) public {
        _mint(to, value);
    }

    function burnTokens(address from, uint value) public {
        _burn(from, value);
    }
}
