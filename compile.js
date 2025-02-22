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
console.log("Full Compilation Output:", JSON.stringify(output, null, 2));

// Log the ABI and Bytecode separately
const contract = output.contracts['Lottery.sol'].Lottery;
console.log("ABI:", JSON.stringify(contract.abi, null, 2));
console.log("Bytecode:", contract.evm.bytecode.object);

// Optionally, save the output to a JSON file for further inspection
fs.writeFileSync('compiledContract.json', JSON.stringify(output, null, 2));

// Export the ABI and Bytecode for deployment
module.exports = {
  abi: contract.abi,
  bytecode: contract.evm.bytecode.object
};
