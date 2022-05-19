import Blockchain from "../blockchain.js";

// create blockchain instance
let bitcoinTransactionTest = new Blockchain();

// create new transaction
const newTransaction = bitcoinTransactionTest.createNewTransaction(
  1000,
  "ShubhUUUYNNNXXX",
  "MairaIIIUURRRFFF"
);

console.log(newTransaction);
