const ganache = require('ganache');
const Web3  = require('web3');
const assert = require('assert');
const web3 =new Web3(ganache.provider({ logging: {quiet: true}}));// Suppress ganache logs
// updated imports added for convenience

//const { abi ,bytecode}= require('../compile'); // import the compiled contract
const compiledContract = require('../compile');
const abi = compiledContract.abi;
const bytecode = compiledContract.bytecode;
console.log("ABI:", abi);
console.log("Bytecode:", bytecode);

let lottery;
let accounts;

beforeEach (async()=>{
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(abi)// create a new contract instance
     .deploy({data:bytecode})
     .send({from: accounts[0],gas : "1000000"});
});
describe('lottery contact',()=> {
    it ('deploys a contract',()=>{// test if the contract is deployed
        assert.ok(lottery.options.address);// check if the contract has an address
    });
    it('allows one account to enter', async()=>{

        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02','ether')

        });
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

});