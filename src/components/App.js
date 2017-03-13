import React from 'react';
import base from '../base';

import GameBoard from './GameBoard'; 
import PlayBoard from './PlayBoard'; 
import sampleGame from '../sample-game';
import sampleClues from '../clues';
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
	    const game = {...this.state.game};
		game.phase['is' + name[0].toUpperCase() + name.slice(1)] = state;
	    this.setState({ game });
	}
	setHelpers(param) {
		const names = this.phase.possibleNames;
		for (var i = 0; i < names.length; i++) {
			this.setHelper(names[i], this.phase.name === names[i]);
		}
	}
	setPhase(phase) {
	    const game = {...this.state.game};
		game.phase.name = phase;
		this.setHelper(phase, true);
	    this.setState({ game });
		return;
	}
	selectClue(cat, clue) {
	    const game = {...this.state.game};
	    game.currentClue = {
	    	cat: cat,
	    	clue: clue
	    };
		this.setPhase('cluePresentation');
	    this.setState({ game });
	}
	state = {
		game: {} 
	}

	componentWillMount() {
		// this runs right before the <App> is rendered
		this.ref = base.syncState(`games/${this.props.params.gameId}/game`, {
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
		// if(!this.state.game){
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
		console.log('sampleClues: ', sampleClues);
		const game = sampleGame;
		const clues = sampleClues;
		var newClues = clues;
		for (var round = 1; round <= 3; round++) {
			for (var cat = 1; cat <= 6; cat++) {

				game.rounds[round].cats[cat] = {
					catTitle: `Movies ${cat}`,
					clues: {
					}
				};

				for (var clue = 1; clue <= 5; clue++) {
					game.rounds[round].cats[cat].clues[clue] = clues[Math.floor(Math.random()*clues.length)];
				}
			}
		}
		game.cats = game.rounds[1].cats;
		this.setState({
			game: game
		});
/*

		newClues = clues.map(clue => {
			Object.keys(clue.q).forEach(key =>{
				key = parseInt(key, 10);
				if (clue.q[key] === clue.cq){
					clue.cq = key;
				}
			});
			if(typeof clue.cq !== 'number'){
				console.log('mismatch clue: ', clue);
			}
			return clue;
		});
		newClues = JSON.stringify(newClues);
*/
		console.log(newClues);

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

