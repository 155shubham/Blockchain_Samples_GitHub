pragma solidity >= 0.5.0 < 0.9.0;

// SPDX-License-Identifier: Unlicensed

pragma solidity >= 0.5.0 < 0.9.0;

//creating a contract to show how storage works
contract StorageContract {

    // Initialising array numbers
    int[] public numbers;

    // Function to insert values
    // in the array numbers
    function Numbers() public {
        numbers.push(1);
        numbers.push(2);

        // Adding value to the
        // first index of the new Instance
        int[] storage myArray = numbers;

        myArray[0] = 0;
    }

    function getNumbers() view public returns(int[] memory) {
        return numbers;
    }
}