import React, { Component } from 'react';
import CardArray from '../components/CardArray';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
// import { robots } from './robots.js';
import { setSearchField, requestRobots } from '../actions';
import { connect } from 'react-redux';
import './App.css';

const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error

		//searchField: state.searchField //for now the state only has one property, check reducers.js
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

class App extends Component {
	//constructor deleted since we can use the requestRobots instead

	componentDidMount(){
		this.props.onRequestRobots();
	}	

	render(){
		const { searchField, onSearchChange, robots, isPending }= this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return(
		<div className="tc">
			<h1 className='f1'>Robofriends</h1>
			<SearchBox searchChange={ onSearchChange }/>
			<Scroll>
				<ErrorBoundary>
					<CardArray robots={ filteredRobots } />
				</ErrorBoundary>
			</Scroll>
		</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);