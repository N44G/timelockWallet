import React, { Component } from 'react'

class Box extends Component {
render(){
	const { height, width, bc } = this.props.attrs
	const style = { width: `${width}em`, height:`${height}em`, backgroundColor:bc}
	return(
	<div style={style} />
	)
}
}

export default Box
