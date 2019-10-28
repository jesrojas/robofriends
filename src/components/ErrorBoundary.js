import React, { Component } from 'react';

class ErrorBoundary extends Component {
	constructor(props){
		super(props);
		const this.state = {
			hasError: false
		}
	}

	componentDidCatch(error, info){
		this.setState({ hasError: true });
	}

	render(){
		if(this.state.hasError){
			return <h1>Error 404</h1>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;