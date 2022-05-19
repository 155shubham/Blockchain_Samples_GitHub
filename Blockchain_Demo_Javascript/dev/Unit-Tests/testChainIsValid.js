import Blockchain from "../blockchain.js";

let blockchain = {
  chain: [
    {
      index: 1,
      timestamp: 1646890474401,
      transactions: [],
      nonce: 100,
      hash: "0",
      previousBlockHash: "0",
    },
    {
      index: 2,
      timestamp: 1646890545294,
      transactions: [
        {
          amount: 100,
          senderAddress: "NODE1_SENDER",
          recipientAddress: "NODE1_RECIPIENT",
          transactionId: "df80a8d0a03311eca7b75f8a6bbb4465",
        },
        {
          amount: 12344.788,
          senderAddress: "NODE2_SENDER",
          recipientAddress: "NODE2_RECIPIENT",
          transactionId: "e02c5220a03311ec9c29cf889f70e9a2",
        },
        {
          amount: 100,
          senderAddress: "NODE1_SENDER",
          recipientAddress: "NODE1_RECIPIENT",
          transactionId: "e2ce7440a03311eca7b75f8a6bbb4465",
        },
        {
          amount: 12344.788,
          senderAddress: "NODE2_SENDER",
          recipientAddress: "NODE2_RECIPIENT",
          transactionId: "e66bbf40a03311ec9c29cf889f70e9a2",
        },
      ],
      nonce: 155506,
      hash: "000085e3f5e276a08b09b004ebd803483208dbd64bd5e46ee97102c4b887d188",
      previousBlockHash: "0",
    },
  ],
  pendTransactions: [
    {
      amount: 12.5,
      senderAddress: "00",
      recipientAddress: "NODE1c49ef210a03311eca7b75f8a6bbb4465",
      transactionId: "eedf9890a03311eca7b75f8a6bbb4465",
    },
  ],
  currentNodeUrl: "http://localhost:3003",
  currentNodeName: "NODE3",
  networkNodes: [
    "http://localhost:3005",
    "http://localhost:3004",
    "http://localhost:3001",
    "http://localhost:3002",
  ],
};

// create object of BlockChain
let testbitcoin = new Blockchain();

// console.log(blockchain);
// console.log(blockchain.chain.length);

// test ChainIsValid method
console.log(testbitcoin.ChainIsValid(blockchain.chain));
