import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import React, { useState } from 'react';


const provider = window.ethereum;

// Initialize the Web3 object with the provider
const web3 = new Web3(provider);

const abi = [{"inputs":[{"internalType":"uint256","name":"numTickets","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"partner","type":"address"}],"name":"acceptSwap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"attendee","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ticketId","type":"uint256"}],"name":"buyTicket","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"person","type":"address"}],"name":"getTicketOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"isSold","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"isValid","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"partner","type":"address"}],"name":"offerSwap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"swappers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ticketOwners","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTickets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const App = () => {
  const [ticketId, setTicketId] = useState(null);
  const [partner, setPartner] = useState(null);

  const handleBuyTicket = async () => {
    // Get the contract instance
  const contract = new web3.eth.Contract(abi, "0x44Bf05422A8E97e22277Aa7991364a46ff459C27");

    try {
      // Call the contract's `buyTicket` function with the ticket ID that the user has entered
      const result = await contract.methods.buyTicket(ticketId).send({
        // TODO: Replace with the correct amount of Ether
        value: web3.utils.toWei('0.0001', 'ether'),
        // TODO: Replace with the correct address
        from: '0x22CE50A8F739c961b71edf524dE17114184436E3',
      });

      // Check if the transaction was successful
      if (result.status) {
        console.log('Success: Ticket purchase was successful.');
      }
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };

  const handleOfferSwap = async () => {
    // Get the contract instance
    const contract = new web3.eth.Contract(abi, "0x44Bf05422A8E97e22277Aa7991364a46ff459C27");
  
    try {
      // Call the contract's `offerSwap` function with the address of the partner
      await contract.methods.offerSwap(partner).send({
        // TODO: Replace with the correct address
        from: '0x22CE50A8F739c961b71edf524dE17114184436E3',
      });
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };
  

  const handleAcceptSwap = async () => {
    // Get the contract instance
    const contract = new web3.eth.Contract(abi, "0x44Bf05422A8E97e22277Aa7991364a46ff459C27");
  
    try {
      // Call the contract's `acceptSwap` function with the address of the partner
      await contract.methods.acceptSwap(partner).send({
        // TODO: Replace with the correct address
        from: '0x22CE50A8F739c961b71edf524dE17114184436E3',
      });
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };
  

  return (
    <div>
      <h1>Ticket Sale</h1>
      <label>
         Ticket ID:
        <input type="number" value={ticketId} onChange={e => setTicketId(e.target.value)} />
      </label>
      <button type="button" onClick={handleBuyTicket}>Buy Ticket</button>
      <br />
      <label>
        Partner:
        <input type="text" value={partner} onChange={e => setPartner(e.target.value)} />
      </label>
      <button type="button" onClick={handleOfferSwap}>Offer Swap</button>
      <button type="button" onClick={handleAcceptSwap}>Accept Swap</button>
    </div>
  );
};


export default App;
