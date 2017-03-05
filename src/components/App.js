import React from 'react';
import base from '../base';

import GameBoard from './GameBoard'; 
import PlayBoard from './PlayBoard'; 
import sampleGame from '../sample-game';
// import ScoreBoard from './ScoreBoard';
// import Buzzer from './Buzzer';
// import Timer from './Timer';
// import StatusBar from './StatusBar';

class App extends React.Component {
	constructor() {
		super();
		this.customMethod = this.customMethod.bind(this);
		this.setHelper = this.setHelper.bind(this);
		this.setHelpers = this.setHelpers.bind(this);
		this.setPhase = this.setPhase.bind(this);
		this.selectClue = this.selectClue.bind(this);
	}
	customMethod(param) {
	}
	setHelper(name, state) {
		this.state.game.phase['is' + name[0].toUpperCase() + name.slice(1)] = state;
		// stuff
	}
	setHelpers(param) {
		const names = this.phase.possibleNames;
		for (var i = 0; i < names.length; i++) {
			this.setHelper(names[i], this.phase.name === names[i]);
		}
	}
	setPhase(phase) {
		console.log('clicked here');
		console.log(this);

	    // take a copy of our state
	    const game = {...this.state.game};
		this.state.game.phase.name = phase;
		this.setHelper(phase, true);
	    this.setState({ game });
		return;
	}
	selectClue(key) {
		this.setPhase('cluePresentation');
	}
	


	state = {game: {} }

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
				<div className="temp">
					{this.props.params.gameId}
				</div>
				<GameBoard game={this.state.game} selectClue={this.selectClue} />
				<PlayBoard game={this.state.game} />
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

