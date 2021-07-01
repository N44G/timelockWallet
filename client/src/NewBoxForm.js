import React,{ Component,useState }  from 'react'

class NewBoxForm extends Component{
constructor(props){
	super(props)
	this.state = { wallet : 0, unlock:0}
	this.handleChange = this.handleChange.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this)
}

// Form submitting logic, prevent default page
// refresh and call create method of BoxList
// component to create new box
handleSubmit(event){
	console.log(event.target.wallet);
	event.preventDefault()
	//this.props.create(this.state)
	this.setState({ wallet :event.target.wallet ,unlock:event.target.unlock})
}

// Method causes to store all the values of the
// input field in react state using single method
// handleChanges of all the input field
// using ES6 javascript feature computed property names
handleChange(event){
	this.setState({
	[event.target.name] : event.target.value
	})
}

// return a form using which we add box properties
// to create Boxes. It is controlled form i.e. values
// of the input field not stored in DOM values are exist
// in react component itself as state

render(){
	return(
	<form onSubmit={this.handleSubmit}>
		<div>
		<label htmlFor='wallet'>wallet</label>
		<input
			name='wallet'
			placeholder='wallet'
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
		<button>Add a new Box!</button>
		</div>
		{/* {this.state.wallet} */}
	</form>
	)
}
}

export default NewBoxForm
