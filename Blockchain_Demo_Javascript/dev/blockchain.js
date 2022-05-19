// sha256 library (Installation command "npm i sha256 --save")
import sha256 from "sha256";

// uuid library for generating random id
import { v1 as uuidv1 } from "uuid";

// store the current node url
const currentNodeUrl = process.argv[3];

// console.log(currentNodeUrl);

// Get Node Name
const currentNodeName = process.argv[4];

// console.log(currentNodeName);

//#region Data structure for block chain

function Blockchain() {
  // chain of all blocks of data
  this.chain = [];

  // list of pending transaction
  this.pendTransactions = [];

  // current node url
  this.currentNodeUrl = currentNodeUrl;

  this.currentNodeName = currentNodeName;

  // list of all nodes except the current node contributing in the blockchain
  this.networkNodes = [];

  // this will create a genesis block and add new block to the blockchain
  this.createNewBlock(100, "0", "0");
}
//#endregion Data structure for block chain

//#region Create/Mine new block of data

// Returns: New block
Blockchain.prototype.createNewBlock = function (nonce, previousHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.pendTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousHash,
  };
  this.chain.push(newBlock);
  this.pendTransactions = [];
  return newBlock;
};

//#endregion Create/Mine new block of data

//#region Fetch the lastblock of data from the blockchain.

// Returns: Last block Data
Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};

//#endregion This will be used to fetch the lastblock of data.

//#region Create new transaction

// Returns: newTransaction
Blockchain.prototype.createNewTransaction = function (
  amount,
  senderAddress,
  recipientAddress
) {
  const newTransaction = {
    amount: amount,
    senderAddress: senderAddress,
    recipientAddress: recipientAddress,
    transactionId: uuidv1().split("-").join(""),
  };
  return newTransaction;
};

//#endregion This will be used to create new transactions

//#region Add transaction to pending transactions

// Returns: block number in which this transaction will be added
Blockchain.prototype.addTransactionToPendingTransactions = function (
  newTransaction
) {
  this.pendTransactions.push(newTransaction);

  //return the block no in which this transaction will be added
  return this.getLastBlock()["index"] + 1;
};
//#endregion Add transactions to pending transactions

//#region Create hash value for the block data using SHA256.

// Returns: hash value
Blockchain.prototype.hashBlock = function (
  previousBlockHash,
  currentBlockData, // These are the pending transaction(s).
  nonce
) {
  const dataAsString =
    previousBlockHash + nonce + JSON.stringify(currentBlockData);
  const hash = sha256(dataAsString);
  return hash;
};

//#endregion This will be used to create hash using SHA256.

//#region Proof of work

// Returns: nonce
Blockchain.prototype.proofOfWork = function (
  previousBlockHash,
  currentBlockData // These are pending transactions
) {
  // NOTE:- To know how much time is required to execute, both console.time() and console.endtime() are required.
  // console.time("ProofOfwork-Execution-time");
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  // console.log("Proof of work hash: ", hash);
  // console.log("Proof of work nonce: ", nonce);

  while (hash.substring(0, 4) !== "0000") {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    // console.log("Proof of work hash: ", hash);
    // console.log("Proof of work nonce: ", nonce);
  }

  // console.timeEnd("ProofOfwork-Execution-time"); // To know execution time

  return nonce;
};

//#endregion Proof of work

//#region Chain Is Valid

Blockchain.prototype.ChainIsValid = function (blockchain) {
  let validChain = true;

  // find whether chain is valid or not
  for (let i = 1; i < blockchain.length; i++) {
    // get current block
    const currentBlock = blockchain[i];

    // // log the values first time with a small chain to check the values
    // console.log("currentBlock-index:", currentBlock["index"]);
    // console.log("currentBlock-timestamp:", currentBlock["timestamp"]);
    // console.log("currentBlock-transactions:", currentBlock["transactions"]);
    // console.log("currentBlock-nonce:", currentBlock["nonce"]);
    // console.log("currentBlock-hash:", currentBlock["hash"]);
    // console.log(
    //   "currentBlock-previousBlockHash:",
    //   currentBlock["previousBlockHash"]
    // );

    // get block previous to current block
    const previousBlock = blockchain[i - 1];

    // console.log("previousBlock:", previousBlock);

    // previousBlockHash of current block
    const previousBlockHashOfCurrentBlock = currentBlock["previousBlockHash"];

    // console.log(
    //   "previousBlockHashOfCurrentBlock:",
    //   previousBlockHashOfCurrentBlock
    // );

    //hash of the previous block
    const hashOfPreviousBlock = previousBlock["hash"];

    // console.log("hashOfPreviousBlock", hashOfPreviousBlock);

    // rehashed value
    const rehashedValueOfCurrentBlock = this.hashBlock(
      hashOfPreviousBlock,
      {
        transactions: currentBlock["transactions"],
        index: currentBlock["index"],
      },
      currentBlock["nonce"]
    );

    // console.log(rehashedValueOfCurrentBlock);

    //Check whether hashes are correct or not by recomputing hash again and comparing
    if (rehashedValueOfCurrentBlock !== currentBlock["hash"])
      validChain = false;

    // console.log(validChain);

    //Check whether hashes are correct or not by comparing with previous block
    if (previousBlockHashOfCurrentBlock !== hashOfPreviousBlock)
      validChain = false;

    // console.log(validChain);
  }

  // get genesis block
  const genesisBlock = blockchain[0];

  // console.log(genesisBlock);

  const correctNonce = genesisBlock["nonce"];
  const correctPreviousBlockHash = genesisBlock["previousBlockHash"];
  const correctHash = genesisBlock["hash"];

  // check genesis block
  if (correctNonce != 100 || correctPreviousBlockHash != 0 || correctHash != 0)
    validChain = false;

  // console.log(validChain);

  // return true when chain is valid otherwise false
  return validChain;
};
//#endregion Chain Is Valid

//#region Get Block

Blockchain.prototype.GetBlock = function (blockhash) {
  // console.log("block-sent: ", blockhash);
  let corrrectBlock = null;

  this.chain.forEach((block) => {
    // console.log("block: ", block.hash);
    if (block.hash === blockhash) {
      return (corrrectBlock = block);
    }
  });
  return corrrectBlock;
};

//#endregion Get Block

//#region Get Transaction

Blockchain.prototype.getTransaction = function (transactionId) {
  let transactionData = { transaction: null, block: null };

  this.chain.forEach((block) => {
    block.transactions.forEach((transaction) => {
      if (transaction.transactionId == transactionId) {
        transactionData = { transaction: transaction, block: block };
        return transactionData;
      }
    });
  });

  return transactionData;
};

//#endregion Get Transaction

//#region Get Data based on Address

// http://localhost:3001/address/NODE2_SenderAddress
Blockchain.prototype.getAddressData = function (address) {
  let addressTransactions = [];

  this.chain.forEach((blockchain) => {
    blockchain.transactions.forEach((transaction) => {
      if (
        transaction.senderAddress == address ||
        transaction.recipientAddress == address
      ) {
        addressTransactions.push(transaction);
      }
    });
  });

  let balance = 0;
  addressTransactions.forEach((transaction) => {
    if (transaction.recipientAddress == address) balance += transaction.amount;
    else if (transaction.senderAddress == address)
      balance -= transaction.amount;
  });

  return {
    addressTransactions: addressTransactions,
    balance: balance,
  };
};

//#endregion Get Transactions based on Address

// Allows exporting of Blockchain constructor function or class to other files for importing.
export default Blockchain;
