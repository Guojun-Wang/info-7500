pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyERC20 is IERC20{
    uint256 private supply;
    mapping(address => uint256) private balances;
    mapping(address => mapping(address => uint256)) public allowances;

    constructor(uint256 _supply) {
        supply = _supply;
        balances[msg.sender] = supply;
    }
    function balanceOf(address _owner) public view returns(uint256){
        return balances[_owner];
    }

    function totalSupply() public view returns (uint256) {
        return supply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        return true;
    }

    function approve(address spender, uint amount) public returns (bool){
        allowances[msg.sender][spender] = amount;
        return true;
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return allowances[owner][spender];
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        allowances[_from][msg.sender] -= _value;
        balances[_from] = balances[_from] - _value;
        balances[_to] = balances[_to] + _value;
        return true;
    }
}
