import React, { Component } from "react";
// import TimeLockedWalletFactory from "./contracts/TimeLockedWalletFactory.json";
import TF from "./contracts/TimeLockedWalletFactory.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null ,
  reciever:null,unlock:null,ether:null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TF.networks[networkId];
      const instance = new web3.eth.Contract(
        TF.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log(deployedNetwork,11,instance);
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(6).send({ from: accounts[0] });
    
    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
    const response = await contract.methods.getWallets('0xc7cf26Be1ec7840915F5d9c637E52E3573799911').call()
    console.log(1111,response);
    // // Update state with the result.
    // this.setState({ storageValue: response });
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
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
        
      <div className='timelock'>
<div className='new wallet'>
<form onSubmit={this.handleSubmit}>
        <label>
          Receiver address:
          <input type="text" value={this.state.reciever} onChange={this.handleChange} />
        </label>
        <label>
          unlock time:
          <input type="text" value={this.state.unlock} onChange={this.handleChange} />
        </label>
        <label>
          optional ether
          <input type="text" value={this.state.ether} onChange={this.handleChange} />
        </label>

        <input type="submit" value="Submit" />
      </form>
</div>

        </div>  
        

      </div>
      

      
    );
  }
}

export default App;
