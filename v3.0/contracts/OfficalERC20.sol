pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract OfficalERC20 is ERC20{
    constructor () ERC20("HI", "Hi"){}

    function pubmint(address account, uint256 amount) public{
        _mint(account, amount);
    }

}
