// SPDX-License-Identifier: Unlicensed

pragma solidity >= 0.5.0 < 0.9.0;

contract testStruct {
    struct Book {
        string title;
        string author;
        uint bookid;
    }

    Book book;

    function setBook() public {
        book = Book('Learn Blockchain', 'SHUBH', 12);
    }

    function getBookId() public view returns (uint) {
        return book.bookid;
    }

}
