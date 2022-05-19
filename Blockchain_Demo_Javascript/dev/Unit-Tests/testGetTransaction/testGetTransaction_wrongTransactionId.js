import Blockchain from "../../blockchain.js";

let bitcoinTransactionTest = new Blockchain();

let newTransaction = bitcoinTransactionTest.createNewTransaction(
  100,
  "NODE1_SENDER",
  "NODE1_RECIPIENT"
);

// store the correct transaction id for testing
let transactionId = "f284eac0a74211ec807bf76459e2d9e4";

// Add new transatcion to pending list
bitcoinTransactionTest.addTransactionToPendingTransactions(newTransaction);

// get previous block and its hash
const previousBlock = bitcoinTransactionTest.getLastBlock();
const previousBlockHash = previousBlock["hash"];

// create new block of data for the pending transactions
const currentBlockData = {
  transactions: bitcoinTransactionTest.pendTransactions,
  index: previousBlock["index"] + 1,
};

// get nonce for the new block of data
const nonce = bitcoinTransactionTest.proofOfWork(
  previousBlockHash,
  currentBlockData
);

// create hash for the new block of data
const blockHash = bitcoinTransactionTest.hashBlock(
  previousBlockHash,
  currentBlockData,
  nonce
);

// create new block with the nonce, hash and the previous block hash
const newBlock = bitcoinTransactionTest.createNewBlock(
  nonce,
  previousBlockHash,
  blockHash
);

let transactionData = bitcoinTransactionTest.getTransaction(transactionId);

console.log(transactionData);
