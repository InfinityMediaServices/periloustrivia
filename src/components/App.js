import React from 'react';
import base from '../base';

import GameBoard from './GameBoard';
import PlayBoard from './PlayBoard';
import emptyGame from '../empty-game';
import sampleClues from '../clues';
import ScoreBoard from './ScoreBoard';
import StatusBar from './StatusBar';
import Buzzer from './Buzzer';
import Timer from './Timer';

class App extends React.Component {
	constructor() {
		super();
		this.base                  = base;
		this.getHelperString       = this.getHelperString.bind(this);
		this.getTickCount          = this.getTickCount.bind(this);
		this.setPhase              = this.setPhase.bind(this);
		this.isPhase               = this.isPhase.bind(this);
		this.phaseDidBegin         = this.phaseDidBegin.bind(this);
		this.calculateResults      = this.calculateResults.bind(this);
		this.getActiveClue         = this.getActiveClue.bind(this);
		this.setActiveClue         = this.setActiveClue.bind(this);
		this.hasInit               = this.hasInit.bind(this);
		this.selectClue            = this.selectClue.bind(this);
		this.selectQuestion        = this.selectQuestion.bind(this);
		this.joinGame              = this.joinGame.bind(this);
		this.startRound            = this.startRound.bind(this);
		this.startGame             = this.startGame.bind(this);
		this.setActivePlayer       = this.setActivePlayer.bind(this);
		this.isRoundOver           = this.isRoundOver.bind(this);
		this.updateScore           = this.updateScore.bind(this);
		this.tick                  = this.tick.bind(this);
		this.tock                  = this.tock.bind(this);
		this.timerToNewPhase       = this.timerToNewPhase.bind(this);
		this.buzzIn                = this.buzzIn.bind(this);
		this.loadSamples           = this.loadSamples.bind(this);
		this.authenticate          = this.authenticate.bind(this);
		this.logout                = this.logout.bind(this);
		this.authHandler           = this.authHandler.bind(this);
		this.gameOn                = this.gameOn.bind(this);
		this.getMe                 = this.getMe.bind(this);
		this.setMe                 = this.setMe.bind(this);
		this.isMe                  = this.isMe.bind(this);
		this.doGameIntro           = this.doGameIntro.bind(this);
		this.doRoundIntro          = this.doRoundIntro.bind(this);
		this.doQuestionSelectIntro = this.doQuestionSelectIntro.bind(this);
		this.state                 = this.state || { game: {} };
		this.timerDepot            = [];
	}
	componentWillMount() {
		// this runs right before the <App> is rendered
		const slug = this.props.params.gameSlug;

		base.fetch(`slugs/${slug}`, {
			context: this,
			then(slugData){
				if (!slugData) { return; }
				this.slugID = slugData.id;
				this.ref = base.syncState(`games/${slugData.id}/game`, {
					context: this,
					state: 'game'
				});
			}
		});
	}

	componentWillUnmount() {
		// // console.log('unmount');
		base.removeBinding(this.ref);
	}

	componentDidMount() {
		// // console.log('component mount');
		const slug = this.props.params.gameSlug;
		base.fetch(`slugs/${slug}`, {
			context: this,
			then(slugData){
				if (!slugData) { return; }
				base.fetch(`games/${slugData.id}/game`, {
					context: this,
					then(data) {
						// // console.log('base fetch');
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
			// // console.log('on Auth');
			if(user) {
				this.authHandler(null, { user });
			}
		});
		console.log('this.setState: ', this.setState);
		this.tock();
	}

	// in case the game is created before the auth callback
	addUserToGame = false;

	authenticate(provider) {
		// // // console.log(`Trying to log in with ${provider}`);
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	logout() {
		const game = {...this.state.game};
		const uid = this.state.uid;
		// // console.log('game before delete: ', game);
		game.players[uid] = null;
		// // console.log('game after delete: ', game);
		this.setState({
			game: game,
			uid: null,
			user: null,
		});
		base.unauth();
	}

	authHandler(err, authData)  {
		// // // console.log('authData: ', authData);
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
				isReady: false,
				email: authData.user.email,
				uid: authData.user.uid,
				photoURL: authData.user.photoURL,
			};
			this.setState({ game });
			this.addUserToGame = false;
		}
	}



	getHelperString(name) {
		return 'is' + name[0].toUpperCase() + name.slice(1);
	}

	getTickCount(phase){
		const game = {...this.state.game};
		phase = phase || game.phase.name;
		return {
			playerSelect    : 0,
			clueSelection   : 0,
			cluePresentation: 3,
			buzzIn          : 5,
			questionSelect  : 7,
			results         : 3,
			scoreAdjustment : 3,
			init            : 0
		}[phase];
	}

	setPhase(phase, callback) {
		const game = {...this.state.game};
		game.phase.name = phase;
		game.phase[this.getHelperString(phase)] = true;
		const names = game.phase.possibleNames;
		for (var i = 0; i < names.length; i++) {
			game.phase[this.getHelperString(names[i])] = game.phase.name === names[i];
		}
		console.log(`setting phase to: ${phase}`);
		this.setState({
			game: { phase: game.phase }
		}, () => {
			console.log('just set phase');
		});
		if (callback instanceof Function) {
			callback.call();
		}
		this.phaseDidBegin();
	}

	isPhase(phase) {
		let isIt = null;
		const game = {...this.state.game};
		if (!game || !game.phase) {
			isIt =  false;
		} else {
			const name = game.phase.name;
			// const prop = game.phase['is' + name[0].toUpperCase() + name.slice(1)];
			// // // console.log('prop: ', prop);
			// isIt = game.phase[prop];
			isIt = name === phase;
			// // console.log(game.phase, isIt);
		}
		// // console.log('checking isPhase: ', phase);
		return isIt;
	}

	phaseDidBegin(){
		// const game = {...this.state.game};
		const that = this;
		const callbacks = {
			playerSelect : function(){
				console.log('playerSelect did begin');
			},
			clueSelection : function(){
				console.log('clueSelection did begin');
			},
			cluePresentation : function(){
				console.log('cluePresentation did begin');
			},
			buzzIn : function(){
				console.log('buzzIn did begin');
				that.timerToNewPhase('results', that.getTickCount('buzzIn'));
			},
			questionSelect : function(){
				console.log('questionSelect did begin');
				that.timerToNewPhase('results', that.getTickCount('questionSelect'));
			},
			results : function(){
				console.log('results did begin');
				that.calculateResults();
				//
			},
			scoreAdjustment : function(){
				console.log('scoreAdjustment did begin');
			},
			init : function(){
				console.log('init did begin');
			}
		}
		callbacks[this.state.game.phase.name].call();

	}

	getActiveClue() {
		const game = this.state.game;
		if (
			game.cats
			&& game.currentClue
			&& game.currentClue.cat
			&& game.currentClue.clue
			&& game.cats[game.currentClue.cat]
			&& game.cats[game.currentClue.cat].clues
			&& game.cats[game.currentClue.cat].clues[game.currentClue.clue]
		) {
			return game.cats[game.currentClue.cat].clues[game.currentClue.clue];
		}
		return false;
	}

	setActiveClue(clue) {
		const game = {...this.state.game};
		game.cats[game.currentClue.cat].clues[game.currentClue.clue] = clue;
		this.setState({
			game: {
				cats: game.cats
			}
		})

	}

	calculateResults(){
		const game = {...this.state.game};
		const me = this.getMe();
		const round = parseInt(game.round, 10);
		const worth = parseInt(game.currentClue.clue, 10) * round * 100;
		console.log('worth: ', worth);

		// am I the activePlayer?
		if (! me.uid === game.activePlayer) {
			// only calc by active player
			return;
		}
		let clue = this.getActiveClue();
		let newPhase;
		clue.losers = clue.losers  || [];
		console.log('clue: ', clue);
		// are there any new guessers?
		let guesser = !clue.guessers ? false : clue.guessers.find((guesser, index) => {
			const dead = guesser.dead;
			clue.guessers[index].dead = true;
			return dead !== true;
		});
		console.log('guesser: ', guesser);
		// now guesser will be either false, undefined or an {}
		if(!guesser) {
			// no new guesser means nobody buzzed in
			// no score to alter
			// set clue to dead and go back to the clueSelection phase
			clue.dead = true;
			newPhase = 'clueSelection';
		} else {
			// i have a buzz
			// did I win?
			let winner = !clue.guesses ? false : clue.guesses.find((guess, index) => {
				const win = guess.q === clue.cq;
				clue.guesses[index].dead = true;
				return win;
			});
			if (!winner) {
				// i lost deduct score and add me to the wall of shame
				clue.losers.push({uid: me.uid});
				this.updateScore(me.uid, worth * -1);
				newPhase = 'buzzIn';
				this.setActivePlayer(game.lastActivePlayer);
			} else {
				// chicken dinner!!!
				clue.winner = winner.uid;
				this.updateScore(winner.uid, worth);
				newPhase = 'clueSelection';
				clue.dead = true;
			}
			console.log('winner: ', winner);

		}
		this.setActiveClue(clue);
		this.timerToNewPhase(newPhase, this.getTickCount('results'));




	}

	hasInit(game) {
		game = game || this.state.game || {};
		// // console.log('hasInit');
		// // console.log('this.state.game: ', this.state.game);
		if (!this.state.game || !this.state.game.phase) {
			return false;
		}
		return this.state.game.phase.hasInit;
	}
	gameOn() {
		return this.state.game && this.state.game.round && this.state.game
	}

	getMe(){
		const game = {...this.state.game};
		const user = {...this.state.user};
		if (!game || !game.players || !user || !user.uid || !game.players[user.uid]){
			return false;
		}
		return game.players[user.uid]
	}

	setMe(propName, propVal){
		const game = {...this.state.game};
		const user = {...this.state.user};
		if (!game || !game.players || !user || !user.uid || !game.players[user.uid]){
			return false;
		}
		game.players[user.uid][propName] = propVal;
		// set state
		this.setState({ game });
		return game.players[user.uid];
	}

	isMe(uid = false){
		const me = this.getMe();

		return uid === me.uid;
	}

	selectClue(cat, clue) {
		this.setState({
			game: {
				currentClue: {
					cat: cat,
					clue: clue
				}
			}
		});
		this.setPhase('cluePresentation');
		this.timerToNewPhase('buzzIn', this.getTickCount('cluePresentation'));
		// set timer
	}

	selectQuestion(q) {
		const game = {...this.state.game};
		const me = this.getMe();
		const cCat = parseInt(game.currentClue.cat, 10);
		const cClue = parseInt(game.currentClue.clue, 10);
		let clue = game.cats[cCat].clues[cClue];
		clue.guesses = clue.guesses || [];
		// log the guess
		clue.guesses.push({
			uid: me.uid,
			q: q
		});
		game.cats[cCat].clues[cClue] = clue;
		// TODO:
		// set phase to results
		// playboard renders results
		// timeout to score adjustment
		// calculate and apply
		// timeout to either buzz in or clue selection





		this.setState({
			game: {
				cats: game.cats
			}
		});

		this.setPhase('results');


		// let newGame = {};
		// newGame.cats = [];
		// newGame.cats[cCat] = { clues: [] };
		// newGame.cats[cCat].clues[cClue] = { guesses: clue.guesses };
		// console.log('newGame.cats[cCat].clues[cClue].guesses: ', newGame.cats[cCat].clues[cClue].guesses);
		// console.log('newGame: ', newGame);
	}

	tick(){
		console.log('tick');
		const game = {...this.state.game};
		const { phase } = game;
		const timerDepot = this.timerDepot;
		console.log('timerDepot: ', timerDepot);

		timerDepot.forEach((timer, index) => {
			console.log(`Running tick on timer index: ${index}`);
			const { phaseLock, onComplete, onTick } = timer;

			// if you are here you own this timer.
			// check phaseLock
			if (phaseLock && phaseLock !== phase.name) {
				// this timer is out of phase and should be removed
				timerDepot[index] = null;
				return;
			}
			// if you are here you are looking at a timer you own that is in phase.
			// let's do this list of things
			// * reduce the ticks by one
			// * run the `onTick` callback
			// * possibly run the `onComplete` callback if we are out of ticks
			timer.ticks -= 1;
			if (onTick instanceof Function) {
				onTick.call(this, {
					ticks: timer.ticks,
					totalTicks: timer.totalTicks,
				});
			}
			if (timer.ticks <= 0) {
				// run the `onComplete` callback and remove the timer
				if (onComplete instanceof Function) {
					onComplete.call();
				}
				timerDepot[index] = null;
				return;
			}
			timerDepot[index] = timer;
		});

		this.timerDepot = timerDepot.filter(timer => timer !== null);

	}

	tock() {
		// Clear any previous interval timer for this player
		// and create a new interval that runs the tick each second
		const that = this;
		console.log('tock running');
		const game = {...this.state.game};
		console.log('game: ', game);
		const players = {};
		const me = this.getMe();
		let tick  = Number(me.tick);

		// if there is an interval let's clear it
		if (tick) {
			clearInterval(tick);
		}
		// add a new interval
		tick = setInterval(that.tick, 1000);

		players[me.uid] = {
			tick
		};

		this.setState({
			game: {
				players
			}
		}, () => {

		});
	}

	timerToNewPhase(phase, duration = false, phaseLock = true) {
		// introduce a new timer in the timer depot that will have a onComplete to setPhase
		if (phase === undefined) return;
		const game = {...this.state.game};
		const me = this.getMe();
		const that = this;
		const timerDepot = this.timerDepot;
		duration = duration !== false ? duration : this.getTickCount();
		phaseLock = phaseLock === true ? game.phase.name : phaseLock;
		const timer = {
			owner: me.uid,
			totalTicks: duration,
			ticks: duration,
			onTick: function(settings){
				const { ticks, totalTicks } = settings;
				// alter the timer vars.
				that.setState({
					game: {
						timer : {
							totalTicks,
							ticks
						}
					}
				})
			},
			onComplete: function(){
				that.setPhase(phase)
			},
			phaseLock
		}

		timerDepot.push(timer);
	}

	buzzIn() {
		const game = {...this.state.game};
		const me = this.getMe();
		let newGame = {};
		base.push(`games/${this.slugID}/game/buzzes`, {
			data: {
				uid: this.state.uid,
				timestamp: base.database.ServerValue.TIMESTAMP
			}
		}).then(ref => {
			console.log('ref.key: ', ref.key);

			base.fetch(`games/${this.slugID}/game/buzzes`, {
				context: this,
				asArray: true
			}).then(data => {
				let winner = data.sort((a, b) => {
					return a.timestamp < b.timestamp ? -1 : 1;
				})[0];
				if(me.uid === winner.uid){
					// set activePlayer to me
					newGame.activePlayer = me.uid;
					// set lastActivePlayer to previous activePlayer
					newGame.lastActivePlayer = game.activePlayer;
					// add me to guessers array
					newGame.cats = game.cats;
					newGame.cats[game.currentClue.cat].clues[game.currentClue.clue].guessers =
					newGame.cats[game.currentClue.cat].clues[game.currentClue.clue].guessers || [];
					newGame.cats[game.currentClue.cat].clues[game.currentClue.clue].guessers.push({ uid: me.uid });
					// update state
					this.setState({ game: newGame });
					this.setPhase('questionSelect')
					// clear buzzes
					base.update(`games/${this.slugID}/game`, {
						data: { buzzes:null }
					}).then(() => {
						console.log('removed buzzes');
					})
				}
				// console.table(buzzIns)
			}).catch(error => {
				//handle error
			})



		}).catch(err => {
			// handle error
		});
	}

	joinGame(user) {
		const game = {...this.state.game};
		game.players[user.uid] = {
			displayName: user.displayName,
			isReady: false,
			email: user.email,
			uid: user.uid,
			photoURL: user.photoURL,
		};
		this.setState({
			game: {
				players: game.players
			}
		});
	}

	startRound() {}

	startGame() {
		const game = {...this.state.game};
		const players = Object.keys(game.players);

		this.setMe('isReady',  true);
		this.setMe('score',  0);
		// check that all users are ready
		let allGood = players.reduce((allGood, player) => {
			if (allGood === false) {
				return false;
			}
			if(!game.players[player].isReady){
				return false;
			}
			return allGood;
		}, true);
		// are there enough players?
		if (players.length < 2) {
			allGood = false;
		}

		console.log('allGood: ', allGood);
		if (allGood) {
			console.log(`all good setActivePlayer to ${game.owner}`);
			game.round = 1;
			game.activePlayer = game.owner;
			game.phase.name = 'clueSelection';
			game.phase.isClueSelection = true;
			this.setState({game}, function(){
				// has to be set AFTER previous so as to not to collide state objects
				console.log('state set');
			});
				// this.setPhase('clueSelection');
		} else {
			// // console.log('waiting on someone');
		}
	}

	setActivePlayer(uid, resetLastActive = false) {
		if (!Object.keys(this.state.game.players).includes(uid)) {
			return false;
		}
		let newGame = {};
		newGame.activePlayer = uid;
		if(resetLastActive){
			newGame.lastActivePlayer = null;
		}
		this.setState({ game: newGame });
	}

	isRoundOver() {
		// Check each clue in `game.cats` and return false if any are not dead and true if all are dead
		const game = {...this.state.game};
		const { cats } = game;

		if (!cats){
			return false;
		}

		return Object.keys(cats).some(cat => {
			const { clues } = cat;

			// if clue.dead === true return false so .some keeps looking
			return Object.keys(clues).some(clue => clue.dead !== true)
		})

	}
	updateScore(uid, delta) {
		const game = {...this.state.game};
		const players = {};
		if(!game.players[uid]) {
			return false
		}
		players[uid] = {
			score : game.players[uid].score + delta
		};
		this.setState({ game: { players }});
	}

	loadSamples(game) {
		// // console.log('Load Samples');
		// // console.log('game: ', game);
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
				isReady: false,
				email: this.state.user.email,
				uid: this.state.user.uid,
				photoURL: this.state.user.photoURL,
			};
		}
		game.owner = this.state.uid;

		// // console.log('game at fn end: ', game);
		return game;
	}


	doGameIntro(){
		this.setPhase('roundIntro');
	}

	doRoundIntro(){
		this.setPhase('clueSelection');
	}

	doQuestionSelectIntro(){
		this.setPhase('questionSelect');
	}


	render() {
		let me = {};
		// // console.log('this.state.game: ', this.state.game);

		if(this.state.uid && this.state.game && this.state.game.players && this.state.game.players[this.state.uid]) {
			me = this.getMe();
		}
		return (
			<div className="perilious-trivia">
				<nav className="menu">
					<span> <a href="/">Home</a> </span>
				{ !this.state.uid ?
					<button className="google" onClick={() => this.authenticate('google')}>
						Log In with Google
					</button>
				:
					<span className="displayName">
						<span> Logged in as {this.state.user.displayName} </span>
						<button onClick={this.logout}>Log Out</button>
					</span>
				}
				</nav>
				<ScoreBoard
					game={this.state.game}
					me={me}
					joinGame={this.joinGame}
					startGame={this.startGame}
					player={this.state.user}
				/>
				{/* TODO: refactor out player prop  in ScoreBoard */}
				<GameBoard
					game={this.state.game}
					me={me}
					selectClue={this.selectClue}
					gameOn={this.gameOn}
					isPhase={this.isPhase}
				/>
				<PlayBoard
					game={this.state.game}
					me={me}
					selectQuestion={this.selectQuestion}
				/>
				<StatusBar
					game={this.state.game}
					me={me}
				/>
				<Timer
					game={this.state.game}
					me={me}
					total={10}
					progress={1}
					timer={this.state.game.timer}
				/>
				<Buzzer
					game={this.state.game}
					me={me}
					isPhase={this.isPhase}
					buzzIn={this.buzzIn}
					getActiveClue={this.getActiveClue}
				/>
			</div>
		)
	}

}

App.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default App;

