import React from 'react';
import base from '../base';

import GameBoard from './GameBoard';
import PlayBoard from './PlayBoard';
import emptyGame from '../empty-game';
import sampleClues from '../clues';
import ScoreBoard from './ScoreBoard';
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
		this.loadSamples = this.loadSamples.bind(this);
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
		const slug = this.props.params.gameSlug;
		base.fetch(`slugs/${slug}`, {
			context: this,
			then(slugData){
				if (!slugData) {
					return;
				}
				this.ref = base.syncState(`games/${slugData.id}/game`, {
					context: this,
					state: 'game',
					then(data) {
						if (!Object.keys(this.state.game).length) {
							this.createGame();
							this.loadSamples();
						}
					}
				});
			}
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}
	createGame() {
		const game = emptyGame;
		this.setState({
			game: game
		});
	}
	loadSamples() {
		const game = this.state.game;
		const clues = sampleClues;
		game.rounds = emptyGame.rounds;
		for (var round = 1; round <= 3; round++) {
			for (var cat = 1; cat <= 6; cat++) {
				game.rounds[round].cats[cat] = {
					catTitle: `Movies ${cat}`,
					clues: {}
				};
				for (var clue = 1; clue <= 5; clue++) {
					game.rounds[round].cats[cat].clues[clue] = clues[Math.floor(Math.random()*clues.length)];
				}
			}
		}
		game.cats = game.rounds[1].cats;
		this.setState({ game: game });
	}

	render() {
		return (
			<div className="perilious-trivia">
				<ScoreBoard game={this.state.game} />
				<GameBoard game={this.state.game} selectClue={this.selectClue} />
				<PlayBoard game={this.state.game} />
				{/*
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

