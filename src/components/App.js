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
		this.setHelper = this.setHelper.bind(this);
		this.setHelpers = this.setHelpers.bind(this);
		this.setPhase = this.setPhase.bind(this);
		this.isPhase = this.isPhase.bind(this);
		this.hasInit = this.hasInit.bind(this);
		this.selectClue = this.selectClue.bind(this);
		this.joinGame = this.joinGame.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.state = this.state || { game: {} }
	}
	componentWillMount() {
		// this runs right before the <App> is rendered
		const slug = this.props.params.gameSlug;

		base.fetch(`slugs/${slug}`, {
			context: this,
			then(slugData){
				if (!slugData) { return; }
				this.ref = base.syncState(`games/${slugData.id}/game`, {
					context: this,
					state: 'game'
				});
			}
		});
	}

	componentWillUnmount() {
		console.log('unmount');
		base.removeBinding(this.ref);
	}

	componentDidMount() {
		console.log('component mount');
		const slug = this.props.params.gameSlug;
		base.fetch(`slugs/${slug}`, {
			context: this,
			then(slugData){
				if (!slugData) { return; }
				base.fetch(`games/${slugData.id}/game`, {
					context: this,
					then(data) {
						console.log('base fetch');
						if (!data) {
							if (!this.hasInit(this.state.game)) {
								let game = this.loadSamples(emptyGame);
								this.setState({ game: game });
							}
						}
					}
				});
			}
		});
		base.onAuth((user) => {
			console.log('on Auth');
			if(user) {
				this.authHandler(null, { user });
			}
		});
	}

	// in case the game is created before the auth callback
	addUserToGame = false;

	authenticate(provider) {
		// console.log(`Trying to log in with ${provider}`);
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	logout() {
		base.unauth();
		this.setState({ uid: null });
	}

	authHandler(err, authData)  {
		// console.log('authData: ', authData);
		if (err) {
			console.error(err);
			return;
		}
		// this.createGame(authData.user);

		this.setState({
			uid: authData.user.uid,
			user: authData.user
		});
		if (this.addUserToGame) {
			const game = {...this.state.game};
			game.players[authData.user.uid] = {
				displayName: authData.user.displayName,
				email: authData.user.email,
				uid: authData.user.uid,
				photoURL: authData.user.photoURL,
			};
			this.setState({ game });
			this.addUserToGame = false;
		}
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

	isPhase(phase) {
		console.log('isPhase: ', phase);
		if (!this.state.game || !this.state.game.phase) {
			return false;
		}
		const game = {...this.state.game};
		const prop = game.phase['is' + name[0].toUpperCase() + name.slice(1)];
		return game.phase[prop];
	}

	hasInit(game) {
		game = game || this.state.game || {};
		console.log('hasInit');
		console.log('this.state.game: ', this.state.game);
		if (!this.state.game || !this.state.game.phase) {
			return false;
		}
		return this.state.game.phase.hasInit;
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

	joinGame(user) {
		const game = {...this.state.game};
		game.players[user.uid] = {
			displayName: user.displayName,
			email: user.email,
			uid: user.uid,
			photoURL: user.photoURL,
		};
		this.setState({ game });
	}

	loadSamples(game) {
		console.log('Load Samples');
		console.log('game: ', game);
		// const game = this.state.game;
		const clues = sampleClues;
		// game.rounds = emptyGame.rounds;
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
		game.phase.hasInit = true;
		game.players = {};
		if(!this.state.uid || !this.state.user){
			this.addUserToGame = true;
		} else {
			game.players[this.state.uid] = {
				displayName: this.state.user.displayName,
				email: this.state.user.email,
				uid: this.state.user.uid,
				photoURL: this.state.user.photoURL,
			};
		}

		console.log('game at fn end: ', game);
		return game;
	}

	render() {
		return (
			<div className="perilious-trivia">
				<p>
					<a href="/">Home</a>
				</p>
				<ScoreBoard
					game={this.state.game}
					joinGame={this.joinGame}
					me={this.state.user}
				/>
				<GameBoard
					game={this.state.game}
					selectClue={this.selectClue}
					isPhase={this.isPhase}
				/>
				<PlayBoard
					game={this.state.game}
				/>



				{/*
				<Buzzer />
				<Timer />
				<StatusBar />
				*/}
			</div>
		)
	}

}

App.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default App;

