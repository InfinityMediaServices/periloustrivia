import React from 'react';
import base from '../base';

import GameBoard from './GameBoard';
import sampleGame from '../sample-game';
// import ScoreBoard from './ScoreBoard';
// import Buzzer from './Buzzer';
// import Timer from './Timer';
// import StatusBar from './StatusBar';

class App extends React.Component {
	constructor() {
		super();
		this.customMethod = this.customMethod.bind(this);
	}
	customMethod(param) {
	}
	
	state = {
		game: {}
	}

	componentWillMount() {
		// this runs right before the <App> is rendered
		this.ref = base.syncState(`${this.props.params.gameId}/game`, {
			context: this,
			state: 'game'
		});

		// check if there is any game in localStorage
		// const localStorageRef = localStorage.getItem(`game-${this.props.params.gameId}`);

		// if(localStorageRef) {
		// 	// update our App component's game state
		// 	this.setState({
		// 		game: JSON.parse(localStorageRef)
		// 	});
		// }
		this.loadSamples();

	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	// componentWillUpdate(nextProps, nextState) {
	// 	localStorage.setItem(`game-${this.props.params.gameId}`, JSON.stringify(nextState.game));
	// }

	loadSamples = () => {
		this.setState({
			game: sampleGame
		});
	};

	render() {
		return (
			<div className="perilious-trivia">
			{/*
			*/}
				<div className="temp">{this.props.params.gameId}</div>
				<GameBoard game={this.state.game} />
				{/*
				<ScoreBoard />
				<Buzzer />
				<Timer />
				<StatusBar />
				*/}
			</div>
		)
	}

}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}

export default App;

