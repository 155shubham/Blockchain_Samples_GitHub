// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.5.0 < 0.9.0;

contract requireStatement {
    function checkinput(uint input) public pure returns (string memory) {
        require(input >= 0, "Invalid inputs");

        return "Valid Input";
    }
}

contract assertStatement {
    bool result;

    function checkOverflow(uint _num1, uint _num2) public {
        uint sum =  _num1 + _num2;
        assert(sum <= 255);
        result = true;
    }

    function getResult() public view returns(string memory) {
        if(result == true) {
            return "No Overflow";
        }
        else{
            return "Overflow exists";
        }
    }
}

contract RevertStatement {
    function checkSum(uint num1, uint num2) pure public returns (string memory, uint) {
        uint sum = num1 + num2;
        if(sum > 100) {
            revert("Sum is greater than 100");
        }
        else {
            return ("Sum is less than 100", sum);
        }
    }
}