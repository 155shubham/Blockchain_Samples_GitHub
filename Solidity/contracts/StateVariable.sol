// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract State {

    // State vairable 
    // This can be initialised with value here or in constructor
    uint public age; 
    // age = 10; // Not a correct way, will get compilation error

    // constructor() {
    //     age = 10; // state variable can be assigned here
    // }

    function setAge() public {
        age = 20; // local variable
    }
}
