// SPDX-License-Identifier: Unlicensed

pragma solidity >= 0.5.0 < 0.9.0;

contract DataTypes {
    int public a = 10; // signed integer value type 
    int public b = -10; // signed integer value type 

    uint public c = 100; // unsigned integer value type

    bool public d = true;

    address public e = 0xb794f5ea0ba39494ce839613fffba74279579268;

    enum food_classes {
        carb, proteins, fat_oils, water, vitamin, minerals
    }
    food_classes foods;    

}
