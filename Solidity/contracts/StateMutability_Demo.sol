// SPDX-License-Identifier: Unlicensed

pragma solidity >= 0.5.0 < 0.9.0;

contract Pure_And_View_Function_State_Mutability_Demo {

    // Declaring state variables
    uint num1 = 10;
    uint num2 = 5;

    /*
        Demonstration of "view" state mutability function modifier.
        Here we are reading the state modifiers and not writing anything to state. 
    */
    function multiplyNums() view public returns (uint product) {
        product = num1 + num2;
    } 

     /*
        Demonstration of "pure" state mutability function modifier.
        Here we are neither reading from state nor writing to state.
    */
    function addNums(int num3, int num4) pure public returns (int sum) {
        sum = num3 + num4;
    } 

}