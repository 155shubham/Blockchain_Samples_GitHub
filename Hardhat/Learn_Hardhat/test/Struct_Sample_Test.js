const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Struct_Sample", function () {
  it("Should return the correct book id", async function () {
    const Book = await ethers.getContractFactory("testStruct");
    const book = await Book.deploy();
    await book.deployed;

    expect(await book.getBookId()).to.equal(0);

    await book.setBook();

    expect(await book.getBookId()).to.equal(12);
  });
});
