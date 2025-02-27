// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import './interfaces/ILiquidityValueCalculator.sol';
import './uniswap/libraries/UniswapV2Library.sol';
import './uniswap/interfaces/IUniswapV2Pair.sol';

contract LiquidityValueCalculator is ILiquidityValueCalculator {
    address public factory;
    constructor(address factory_) {
        factory = factory_;
    }

    function pairInfo(address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, tokenA, tokenB));
        (uint reserves0, uint reserves1,) = pair.getReserves();
        (reserveA, reserveB) = tokenA == pair.token0() ? (reserves0, reserves1) : (reserves1, reserves0);
    }

    function computeLiquidityShareValue(uint liquidity, address tokenA, address tokenB) pure external override returns (uint tokenAAmount, uint tokenBAmount) {
        revert('TODO');
    }
}