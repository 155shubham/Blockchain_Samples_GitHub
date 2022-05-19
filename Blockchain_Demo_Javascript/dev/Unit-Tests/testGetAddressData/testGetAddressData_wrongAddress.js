import Blockchain from "../../blockchain.js";

let bitcoinTransactionTest = new Blockchain();

let newTransaction1 = bitcoinTransactionTest.createNewTransaction(
  100,
  "NODE1_SENDER",
  "NODE1_RECIPIENT"
);
let newTransaction2 = bitcoinTransactionTest.createNewTransaction(
  200,
  "NODE1_SENDER",
  "NODE1_RECIPIENT"
);

// store the wrong address to be tested
let address = "NoDE_Addres_WER";

// Add new transatcion to pending list
bitcoinTransactionTest.addTransactionToPendingTransactions(newTransaction1);
bitcoinTransactionTest.addTransactionToPendingTransactions(newTransaction2);

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

// console.log(address);
// console.log(newBlock);

let addressData = bitcoinTransactionTest.getAddressData(address);

console.log(addressData);
