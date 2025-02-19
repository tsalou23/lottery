const path = require("path");
const fs = require("fs");
const solc = require("solc");

const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf8");
const input = {
    language: 'Solidity',
    sources: {
      'Lottery.sol': {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode']
        }
      }
    }
  };
  
// Compile the contract
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Log the output to inspect its structure
console.log(output);

// Export the compiled contract
module.exports = output.contracts['Lottery.sol'].Lottery;
