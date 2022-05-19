//SPDX-License-Identifier: Unlicensed

pragma solidity >=0.5.0 <0.9.0;

contract SimpleContract {
    uint data;

    function getData() public view returns (uint) {
        return data;
    }

    function setData(uint num) public {
        data = num;
    }
}