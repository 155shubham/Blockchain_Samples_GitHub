import Blockchain from "./blockchain.js"; //ES6 way of importing exported class or constructor function

const bitcoin = new Blockchain(); //created an object of Blockchain constructor function or class

// console.log(bitcoin); // check blockchain having empty chain and empty pending transactions

bitcoin.createNewBlock(2389, "NoBlockPreviouslyAvailable", "FirstBlockHash"); //create first block and adding to the chain block

// console.log(bitcoin); // check blockchain having one block and empty pending transactions

// console.log("Last Block" + bitcoin.getLastBlock()); //get last block of the blockchain

let index = bitcoin.createNewTransaction(
  345,
  "AmairahXXXXXYYYYYNNN",
  "JennyAAAABBBYYYY"
); //create new transaction and add it to the list of the pending transaction

// console.log(bitcoin.pendTransactions); // check pending transactions available in pendTransactions array
// console.log("This New transaction will be added to block no: " + index);

bitcoin.createNewBlock(111, "FirstBlockHash", "SecondBlockHash"); //create second block and adding to the chain block

// console.log(bitcoin); // Check the new block with the new transaction added and pending trnsactions will become empty again

//having multiple transactions pending
bitcoin.createNewTransaction(345, "NykaRRXXXYYYYYNNN", "AlomAAAABBBYYYY");
bitcoin.createNewTransaction(1000, "NykaRRXXXYYYYYNNN", "AlomAAAABBBYYYY");
bitcoin.createNewTransaction(20, "BevenIIIXYYYYYNNN", "PollardPPPPABBBYYYY");

// console.log(bitcoin); // Now there will three pending transactions in pendTransactions array

bitcoin.createNewBlock(9823, "SecondBlockHash", "ThirdBlockHash"); //create third block  having multiple transactions added and adding to the chain block

// console.log(bitcoin); //Check blockchain again to verify transactions got added in the third block
//// which is the newest block.
// console.log(bitcoin.chain[2]); // Check specificall multiple transactions in the last block

//#region Generate hash value for the any random data using SHA256 to check the hashed value.
let currentBlockData = [
  {
    amount: 890,
    senderAdd: "SJJJJUUUUU",
    RecipientAdd: "RJJJJUUUUU",
  },
  {
    amount: 8902,
    senderAdd: "YJJJUUUUU",
    RecipientAdd: "KJJJJUUUUU",
  },
  {
    amount: 345,
    senderAdd: "DJJJJUUUUI",
    RecipientAdd: "TJJJJUUUUU",
  },
];
let currentBlockNonce = 6754;
let data =
  bitcoin.getLastBlock()["hash"] +
  JSON.stringify(currentBlockData) +
  currentBlockNonce; //data string for which hash will be generated
let currentBlockhash = bitcoin.hashBlock(
  bitcoin.getLastBlock()["hash"],
  currentBlockData,
  currentBlockNonce
); //get hash value for the above data string

// console.log("Data: " + data); //check the data generated
// console.log("Hash value: " + currentBlockhash); //check the hash value generated

//NOTE:- In the above currentBlockData, change any value or nonce value and try to check the different
// hashed value
//#endregion Generate hash value for the any random data using SHA256 to check the hashed value.

//#region Generate new block having hashed value generated using SHA256
bitcoin.createNewTransaction(45, "SevenIIIXYYYYYNNN", "PollardPPPPABBBYYYY");
currentBlockNonce = 6754;
currentBlockhash = bitcoin.hashBlock(
  bitcoin.getLastBlock()["hash"],
  bitcoin.pendTransactions,
  currentBlockNonce
);
bitcoin.createNewBlock(
  currentBlockNonce,
  bitcoin.getLastBlock()["hash"],
  currentBlockhash
);

// console.log(bitcoin);//check the newly generatied block with hashvalue
//#endregion Generate new block having hashed value generated using SHA256

//#region Mining a new block with a new nonce, multiple transactions and new hash for the multiple transactions
currentBlockNonce = 8798;
bitcoin.createNewTransaction(678, "ShubhUUUYNNNXXX", "AtimaUUUUUUTTTTRRR");
bitcoin.createNewTransaction(789, "PollardPPPPABBBYYYY", "MairaIIIUURRRFFF");
bitcoin.createNewTransaction(1000, "JennIIIXYYYYYNNN", "PollardPPPPABBBYYYY");
bitcoin.createNewTransaction(7800, "PollardPPPPABBBYYYY", "JennIIIXYYYYYNNN");
bitcoin.createNewTransaction(900, "ShubhUUUYNNNXXX", "JennIIIXYYYYYNNN");
// console.log(bitcoin.pendTransactions); //check the pending transactions till now
currentBlockhash = bitcoin.hashBlock(
  bitcoin.getLastBlock()["hash"],
  bitcoin.pendTransactions,
  currentBlockNonce
);
bitcoin.createNewBlock(
  currentBlockNonce,
  bitcoin.getLastBlock()["hash"],
  currentBlockhash
);

// console.log(bitcoin); //check the multiple transactions got added to the last block
////alongwith newly generated hash and also pending transaction become empty
//#endregion Mining a new block with a new nonce, multiple transactions and new hash for the multiple transactions

//#region Test Proof of work
//Add new transactions to the pending Transaction array
bitcoin.createNewTransaction(1000, "ShubhUUUYNNNXXX", "MairaIIIUURRRFFF");
bitcoin.createNewTransaction(800, "PollardPPPPABBBYYYY", "JennIIIXYYYYYNNN");

//Mine the data using Proof of work
const nonce = bitcoin.proofOfWork(
  bitcoin.getLastBlock()["hash"],
  bitcoin.pendTransactions
);

console.log("Nonce obtained from proof of work: ", nonce);

//create hash for new block data
currentBlockhash = bitcoin.hashBlock(
  bitcoin.getLastBlock()["hash"],
  bitcoin.pendTransactions,
  nonce
);

console.log("Hash based on the above nonce: ", currentBlockhash);

//create new block
bitcoin.createNewBlock(nonce, bitcoin.getLastBlock()["hash"], currentBlockhash);

console.log(bitcoin);

//#endregion Test Proof of work

//#region Test Is Chain Valid

//#endregion Test Is Chain Valid
