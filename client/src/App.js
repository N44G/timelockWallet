import React, { Component } from "react";
import TF from "./contracts/TimeLockedWalletFactory.json";
//import NewBoxForm from './NewBoxForm';
import TW from './contracts/TimeLockedWallet.json'
//import SimpleStorageContract from "./contracts/TimeLockedWalletFactory.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state = { storageValue: 0, web3: null, accounts: null, contract: null ,
      reciever:null,unlock:null,ether:null,userWallets:[],unlocks:[],
      info:[],
      tlwallet:null,
      tokenaddress:null,
      tokenwallet:null,
      d:Date(),d2:Date(),
      unlocks:[],
      createdAt:[]
      };
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this);
  
      
      
    }
  
  //state = { storageValue: 0, web3: null, accounts: null, contract: null };


  handleSubmit (){
    console.log(this.state.wallet,this.state.unlock,'zz');
    //event.preventDefault()
    //this.props.create(this.state)
    //this.setState({ wallet :thiss.state.wallet ,unlock:this.state.unlock})
    this.createTimeWallet();
    //const createnew = await contract.methods.newTimeLockedWallet(this.state.accounts[0],this.state.unlock).send({ from: accounts[0] });
    //console.log('createNew',createnew);
    
  };
  
  handleChange(e){
    this.setState({
    [e.target.name] : e.target.value
    })
  }
  
  createTimeWallet= async ()=>{

    const contract=this.state.contract;
    const createnew = await contract.methods.newTimeLockedWallet(this.state.accounts[0],this.state.unlock).send({ from: this.state.accounts[0] });
  
}
claim= async ()=>{

  const address=this.state.tlwallet;
  const TWs = new this.state.web3.eth.Contract(
    TW.abi,
    address
  );
  const claim = await TWs.methods.withdraw().send({ from: this.state.accounts[0] });

}
claimtokens= async ()=>{

  const address=this.state.tokenwallet;
  const tokenaddress=this.state.tokenaddress;
  const TWs = new this.state.web3.eth.Contract(
    TW.abi,
    address
  );
  const claim = await TWs.methods.withdrawTokens(tokenaddress).send({ from: this.state.accounts[0] });
    console.log('claimtokens');
}


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
    const response = await contract.methods.getWallets(accounts[0]).call();
    
    this.setState({userWallets:response});
    //console.log('userWallets response',response);
    for (let i = 0; i < this.state.userWallets.length; i++) {
      console.log('single wallet response',response[i]);
      const networkId = await this.state.web3.eth.net.getId();
        const deployedNetwork = TW.networks[networkId];
        //console.log('deployedNetwork.address',deployedNetwork,TW,TF);
        //console.log('deployedNetwork.address',networkId);
        
        const TWs = new this.state.web3.eth.Contract(
          TW.abi,
          response[i]
        );
          
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        //console.log(TWs);
        
        //console.log('createdat',await TWs.methods.info().call());
        let {info,unlocks,createdAt}=this.state;
        console.log("createdat",createdAt);
        info.push(await TWs.methods.info().call());
        let d=new Date();
        let d2=new Date();
        info.map(i=>
          d=new Date(i[2]),
          d2=new Date(i[3]),

          unlocks.push(d.toString()),
          createdAt.push(d2.toString()),
          console.log(unlocks,createdAt,'dddd',i[3],i[2])
          )
        this.setState({info,unlocks,createdAt});
        //console.log("info",this.state.info);
        //this.setState({  contract: instance });
    }
    

  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Time Locked Wallet</h1>
  <h2>Create Wallet form</h2>
  <div className='walletsform'>
      <div>
		<label htmlFor='wallet'>recepient address</label>
		<input
			name='wallet'
			placeholder='enter the adress who can access the wallet'
			value = {this.state.wallet}
			onChange={this.handleChange}
		/>
		</div>
		<div>
		<label htmlFor='unlock'>unlock time</label>
		<input
			name='unlock'
			placeholder='unlock'
			value = {this.state.unlock}
			onChange={this.handleChange}
		/>
		</div>
		<div>
		<button onClick={this.handleSubmit}>Create a New wallet</button>
		</div>

      </div>
      <h2>Claim Ether or BNB</h2>
      <div className='claim'>
      <div>
		<label htmlFor='tlwallet'>time locked wallet address</label>
		<input
			name='tlwallet'
			placeholder='time locked wallet'
			value = {this.state.tlwallet}
			onChange={this.handleChange}
		/>
		
		</div>
		<div>
		<button onClick={this.claim}>Claim Ether/BNB</button>
		</div>
      </div>
  <h2>claim tokens </h2>
<div className='claimtokens'>
      <div>
		<label htmlFor='tokenwallet'>time locked wallet</label>
		<input
			name='tokenwallet'
			placeholder='enter the timelcked wallet'
			value = {this.state.wallet}
			onChange={this.handleChange}
		/>
		</div>
		<div>
		<label htmlFor='tokenaddress'>tokenaddress</label>
		<input
			name='tokenaddress'
			placeholder='token address'
			value = {this.state.unlock}
			onChange={this.handleChange}
		/>
		</div>
		<div>
		<button onClick={this.claimtokens}>claim tokens</button>
		</div>

      </div>
      
  
  

  {/* </form> */}


  {/* <div>{this.state.unlock}unlock{this.state.wallet}'updateinfo'</div> */}
 <h3> Time locked wallets created by {this.state.accounts[0]}
</h3>
      {/* <div>{this.state.userWallets[0],"userWallets"}</div> */}
      <ul>
          {this.state.userWallets.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      
      <ul>
      {
      Object.keys(this.state.info).map(item => (
            //console.log(this.state.info[item],Object.keys(item),'ggg'),
            <div>
              <li >creator {this.state.info[item][0]}</li>
            <li >Recepient {this.state.info[item][1]}</li>
            {/* { d=new Date(this.state.info[item][2]*1000)} */}
            {/* {console.log(new Date(this.state.info[item][2]*1000),'date')} */}
            {/* <li >unlockdate {new Date(this.state.info[item][2]*1000)}</li> */}
            {/* <li >unlockdate <b>(time in utc epoch)</b> {this.state.info[item][2]}</li> */}
            <li >unlockdate <b>(time in utc epoch)</b> {this.state.unlocks[item]}</li>
            {/* <li >unlockdate {d.toString()}</li> */}
            
            {/* <li >createdAt<b>(time utc epoch)</b> {this.state.createdAt[item]}</li> */}
            <li >balance {this.state.info[item][4]/10**18}</li>
           
            </div>
            
          )
          )}
        </ul>
      
      </div>
    );
  }
}

export default App;
