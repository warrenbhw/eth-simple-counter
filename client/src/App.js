import React, { Component } from "react";
import SimpleCounterContract from './contracts/SimpleCounter.json'
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { count: 0, storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleCounterContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleCounterContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.fetchCount);
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runIncrement = async () => {
    const { accounts, contract } = this.state;

    // Increments the counter in the simple counter contract.
    await contract.methods.increment().send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getCount().call();

    // Update state with the result.
    this.setState({ count: response });
  };

  fetchCount = async () => {
    const { contract } = this.state;

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getCount().call();

    // Update state with the result.
    this.setState({ count: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <div>The value stored in the counter is: {this.state.count}</div>
        <button onClick={this.runIncrement}>Increment the counter</button>
      </div>
    );
  }
}

export default App;
