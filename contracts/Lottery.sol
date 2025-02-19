// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

contract Lottery {
    address public manager;
    address [] public players;

    constructor() {
        manager = msg.sender;
    }
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
   function random() private view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, players, msg.sender)));
}

    function pickWinner() public restricted {
        require(players.length >0 ,"No players in the lottery");
        uint index = random() % players.length;
        address winner = players[index];
        uint prize = address(this).balance;
        (bool succes, )=payable(winner).call{value: prize}("");
        require(succes, "Transfer failed");
        players = new address[](0);
    }
    modifier restricted() {
        require(msg.sender == manager,"Only manager can call this");
        _;
    }
}
