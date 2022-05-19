import Blockchain from "../../blockchain.js";

// Create new blockchain instance
let bitcoinGetBlockTest = new Blockchain();

// Create new transaction
const newTransaction = bitcoinGetBlockTest.createNewTransaction(
  1000,
  "ShubhUUUYNNNXXX",
  "MairaIIIUURRRFFF"
);

// Add new transatcion to pending list
bitcoinGetBlockTest.addTransactionToPendingTransactions(newTransaction);

// get previous block and its hash
const previousBlock = bitcoinGetBlockTest.getLastBlock();
const previousBlockHash = previousBlock["hash"];

// create new block of data for the pending transactions
const currentBlockData = {
  transactions: bitcoinGetBlockTest.pendTransactions,
  index: previousBlock["index"] + 1,
};

// get nonce for the new block of data
const nonce = bitcoinGetBlockTest.proofOfWork(
  previousBlockHash,
  currentBlockData
);

// create hash for the new block of data
const blockHash = bitcoinGetBlockTest.hashBlock(
  previousBlockHash,
  currentBlockData,
  nonce
);

// create new block with the nonce, hash and the previous block hash
const newBlock = bitcoinGetBlockTest.createNewBlock(
  nonce,
  previousBlockHash,
  blockHash
);

// assing a hash to a variable to search and find that block
let hashToBeSearched = blockHash;
// let hashToBeSearched = "0";

// console.log(newBlock);

// let blockFound = bitcoinGetBlockTest.GetBlock(hashToBeSearched);

// test the getBlock method
let block = bitcoinGetBlockTest.GetBlock(hashToBeSearched);
if (block == {} || !block) {
  console.log("Not A Correct Hash Value. Block is ", block);
} else if (block) {
  console.log(
    "Hash Found. Block is :",
    bitcoinGetBlockTest.GetBlock(hashToBeSearched)
  );
}

// console.log("block Found After Search:", blockFound);
