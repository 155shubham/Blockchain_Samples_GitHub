// NOTE:- An instance of this API will be one network node

// import express js for nodeserver
import express from "express";

// import body-parser to parse body parameters into json
import bodyParser from "body-parser";

// random number to generate node address
import { v1 as uuidv1 } from "uuid";

// to add and request promises
import rp from "request-promise";

// import blockchain to do blockchain operations
import Blockchain from "./blockchain.js";

import __dirname from "./dirname.js";

// get the port number for this instance
const port = process.argv[2];

// console.log(port);

// Get the express server object to create end points
const app = express();

// Create object of blockchain to do blockchain operation
const bitcoin = new Blockchain();

// Create a unique Node address for this instance using uuid library
const nodeAddress = bitcoin.currentNodeName + uuidv1().split("-").join("");

// console.log(nodeAddress);

// This is used to parse the Json object send from client (browser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// NOTE:- Must use the route in browser with localhost to see
//        the results of the routes

//#region Default endpoint

app.get("/", function (req, res) {
  res.send(
    `This is default route. 
    Add other endpoints like http://localhost:${port}<EndPoints> to see the specific feature
    Some other end points are 
    1. http://localhost:${port}/blockchain, 
    2. http://localhost:${port}/mine`
  );
});

//#endregion Default endpoint

//#region Get blockchain

app.get("/blockchain", function (req, res) {
  // console.log(bitcoin); // will log in terminal
  res.send(bitcoin);
});

//#endregion Get blockchain

//#region Add tranaction to pending transactions

app.post("/transaction", function (req, res) {
  const newTransaction = req.body;
  const blockIndex =
    bitcoin.addTransactionToPendingTransactions(newTransaction);
  res.json({ note: `Transaction will be added in block ${blockIndex}` });
});

//#endregion Add tranaction to pending transactions

//#region Create new transaction and add this transaction to pending transactions

app.post("/transaction/broadcast", function (req, res) {
  // create new transaction
  const newTransaction = bitcoin.createNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient
  );

  // add transatcion to pending list of current node
  bitcoin.addTransactionToPendingTransactions(newTransaction);

  const requestPromises = [];
  bitcoin.networkNodes.forEach((networkNodeUrl) => {
    const requestOptions = {
      uri: networkNodeUrl + "/transaction",
      method: "POST",
      body: newTransaction,
      json: true,
    };
    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises).then((data) => {
    res.json("Transaction created and broadcast successfully");
  });
});

//#endregion Create new transaction and add this transaction to pending transactions

//#region Mine new block,validate it  and broadcast it to the network nodes

app.get("/mine", function (req, res) {
  if (bitcoin.pendTransactions.length > 0) {
    const previousBlock = bitcoin.getLastBlock();
    const previousBlockHash = previousBlock["hash"];

    const currentBlockData = {
      transactions: bitcoin.pendTransactions,
      index: previousBlock["index"] + 1,
    };

    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);

    const blockHash = bitcoin.hashBlock(
      previousBlockHash,
      currentBlockData,
      nonce
    );

    const newBlock = bitcoin.createNewBlock(
      nonce,
      previousBlockHash,
      blockHash
    );

    const requestPromise = [];
    bitcoin.networkNodes.forEach((networkNodeUrl) => {
      const requestOptions = {
        uri: networkNodeUrl + "/receive-new-block",
        method: "POST",
        body: { newBlock: newBlock },
        json: true,
      };
      requestPromise.push(rp(requestOptions));
    });

    Promise.all(requestPromise)
      .then((data) => {
        const requestOptions = {
          uri: bitcoin.currentNodeUrl + "/transaction/broadcast",
          method: "POST",
          body: {
            amount: 12.5,
            sender: "00",
            recipient: nodeAddress,
          },
          json: true,
        };
        // add the miner reward transaction to the pending transactions
        return rp(requestOptions);
      })
      .then((data) => {
        res.json({
          note: "New block mined and broadcast successfully",
          newBlock: newBlock,
        });
      });
  } else {
    res.json({
      note: "No New block found to be mined",
    });
  }
});

//#endregion Mine new block,validate it  and broadcast it to the network nodes

//#region Add transactions to other nodes after validating successfully

app.post("/receive-new-block", function (req, res) {
  // console.log(req.body.newBlock);
  const newBlock = req.body.newBlock;
  const lastblock = bitcoin.getLastBlock();
  const correctHash = lastblock["hash"] === newBlock["previousBlockHash"];
  const correctIndex = lastblock["index"] + 1 === newBlock["index"];

  if (correctHash && correctIndex) {
    bitcoin.chain.push(newBlock);
    bitcoin.pendTransactions = [];
    res.json({
      note: "New Block received and accepted",
    });
  } else {
    res.json({});
  }
});

//#endregion Add transactions to other nodes after validating successfully

//#region register new node and broadcast the new to other nodes for registration

app.post("/register-node-and-broadcast", function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
  const notCurrentNode = newNodeUrl !== bitcoin.currentNodeUrl;

  // add the new node to all the existing nodes
  if (nodeNotAlreadyPresent && notCurrentNode) {
    bitcoin.networkNodes.push(newNodeUrl);
  }

  const regNodesPromises = []; // To store all the requestoptions
  bitcoin.networkNodes.forEach((networkNode) => {
    const requestOptions = {
      uri: networkNode + "/register-node",
      method: "POST",
      body: { newNodeUrl: newNodeUrl },
      json: true,
    };
    // console.log(requestOptions);
    regNodesPromises.push(rp(requestOptions));
  });

  Promise.all(regNodesPromises)
    .then((data) => {
      const bulkRequestOptions = {
        uri: newNodeUrl + "/register-nodes-bulk",
        method: "POST",
        body: {
          allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl],
        },
        json: true,
      };
      // console.log("bulkRequestOptions: ", bulkRequestOptions);
      return rp(bulkRequestOptions);
    })
    .then((data) => {
      res.json({ note: "New Node registered with network successfully." });
    });
});

//#endregion register new node and broadcast the new to other nodes for registration

//#region register new node to other nodes

app.post("/register-node", function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
  const notCurrentNode = newNodeUrl !== bitcoin.currentNodeUrl;

  if (nodeNotAlreadyPresent && notCurrentNode) {
    bitcoin.networkNodes.push(newNodeUrl);
    res.json({ note: "New node registered successfully." });
  } else {
    res.json({ note: "Node already exists." });
  }
});

//#endregion register new node to other nodes

//#region register all other nodes to the new node

app.post("/register-nodes-bulk", function (req, res) {
  const allNetworkNodes = req.body.allNetworkNodes;

  allNetworkNodes.forEach((networkNodeUrl) => {
    const nodeNotAlreadyPresent =
      bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
    const notCurrentNode = networkNodeUrl !== bitcoin.currentNodeUrl;

    if (nodeNotAlreadyPresent && notCurrentNode) {
      bitcoin.networkNodes.push(networkNodeUrl);
    }
  });

  res.json({ note: "Bulk registration successful." });
});

//#endregion register all other nodes to the new node

//#region Consensus end point for checking correctness of blockchain and
//            update them with the correct one if found wrong.

app.get("/consensus", function (req, res) {
  const regNodesPromises = [];
  bitcoin.networkNodes.forEach((networkNodeUrl) => {
    const requestOptions = {
      uri: networkNodeUrl + "/blockchain",
      method: "GET",
      json: true,
    };
    regNodesPromises.push(rp(requestOptions));
  });

  Promise.all(regNodesPromises).then((blockchains) => {
    const currChainLength = bitcoin.chain.length;
    let maxChainLength = currChainLength;
    let newLongestChain = null;
    let newPendTransactions = null;

    // console.log(currChainLength);

    blockchains.forEach((blockchain) => {
      if (blockchain.chain.length > maxChainLength) {
        maxChainLength = blockchain.chain.length;
        newLongestChain = blockchain.chain;
        newPendTransactions = blockchain.pendTransactions;
      }
    });

    // console.log("newLongestChain:", newLongestChain);
    // console.log("newPendTransactions:", newPendTransactions);

    // console.log("ChainIsValid: ", bitcoin.ChainIsValid(newLongestChain));
    // console.log("!newLongestChain: ", !newLongestChain);

    if (
      !newLongestChain ||
      (newLongestChain && !bitcoin.ChainIsValid(newLongestChain))
    ) {
      res.json({
        note: "Current chain has not been replaced.",
        chain: bitcoin.chain,
      });
    } else if (newLongestChain && bitcoin.ChainIsValid(newLongestChain)) {
      bitcoin.chain = newLongestChain;
      bitcoin.pendTransactions = newPendTransactions;
      res.json({
        note: "This chain has been replaced.",
        chain: bitcoin.chain,
      });
    }
  });
});

//#endregion Consensus end point for checking correctness of blockchain and
//            update them with the correct one if found wrong.

//#region Get Block using blockHash

// http://localhost:3001/block/dhfhhfhfjj345jeiriir
app.get("/block/:blockhash", (req, res) => {
  const blockhash = req.params.blockhash;
  const corrrectBlock = bitcoin.GetBlock(blockhash);
  res.json({ block: corrrectBlock });
});

//#endregion Get Block using blockHash

//#region Get transaction and block based on transactionId

// http://localhost:3001/transaction/dhfhhfhfjj345jeiriir
app.get("/transaction/:transactionId", function (req, res) {
  let tranactionId = req.params.transactionId;
  let transactionData = bitcoin.getTransaction(tranactionId);
  res.json({
    transaction: transactionData.transaction,
    block: transactionData.block,
  });
});

//#endregion Get transaction and block based on transactionId

//#region Get Data based on Address

// http://localhost:3001/address/NODE2_SenderAddress
app.get("/address/:address", function (req, res) {
  let address = req.params.address;
  let addressData = bitcoin.getAddressData(address);
  res.json({
    addressData: addressData,
  });
});

//#endregion Get Transactions based on Address

//#region Get Block Explorer

app.get("/block-explorer", function (req, res) {
  res.sendFile("./block-explorer/index.html", { root: __dirname });
});

//#endregion Get Block Explorer

//#region Log the port number

app.listen(port, function (req, res) {
  console.log(`Listening on port ${port}...`);
});

//#endregion Log the port number
