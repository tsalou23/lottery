const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');  // Fix for Web3 import (no need for { Web3 })
const { interface, bytecode } = require('./compile');
require('dotenv').config();

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.INFURA_URL
);
const web3 = new Web3(provider.engine);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  // Deploy the contract
  const result = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  // Log deployment result
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();  // Stop the provider to avoid hanging the script
};

deploy();
