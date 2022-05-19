import Blockchain from "../blockchain.js";

// Create new blockchain instance
let bitcoinAddTransactionToPendingTransactionsTest = new Blockchain();

// Create new transaction
const newTransaction =
  bitcoinAddTransactionToPendingTransactionsTest.createNewTransaction(
    1000,
    "ShubhUUUYNNNXXX",
    "MairaIIIUURRRFFF"
  );

// Add the new transaction to pending list
let newBlockIndex =
  bitcoinAddTransactionToPendingTransactionsTest.addTransactionToPendingTransactions(
    newTransaction
  );

// Log the new transaction
console.log("New Transaction", newTransaction);

console.log("New Transaction was added to block indez number: ", newBlockIndex);

console.log(
  "Validate by looking the pending transaction list in this block chain: ",
  bitcoinAddTransactionToPendingTransactionsTest
);
