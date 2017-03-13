import React from 'react';
import base from '../base';
import Hashids  from 'hashids';
import { getFunName } from '../helpers';

const hashids = new Hashids(
	"Salt and Pepa's here, and we're in effect", 
	8, 
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
);

class GamePicker extends React.Component {
	constructor() {
		super();
		this.goToGame = this.goToGame.bind(this);
		this.renderTest = this.renderTest.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.logout = this.logout.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.pushChild = this.pushChild.bind(this);
	}
	goToGame(event) {
		event.preventDefault();
		console.log('You Changed the URL');
		// first grab the text from the box
		const gameId = this.gameInput.value;
		console.log(`Going to ${gameId}`)
		// second we're going to transition from / to /game/:gameId
		this.context.router.transitionTo(`/game/${gameId}`);
	}
	pushChild(name) {
		var pusher;
		for (var i = 0; i < 100000; i++) {
			pusher = base.push('/', {
				data: {
					thing: i
				}
			});
			console.log('pusher.key: ', pusher.key);
		}
	}

	authenticate(provider) {
		console.log(`Trying to log in with ${provider}`);
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	logout() {
		base.unauth();
		this.setState({ uid: null });
	}

	authHandler(err, authData)  {
		console.log('authData: ', authData);
		if (err) {
			console.error(err);
			return;
		}
		// create new game

		const gameData = {
			players: {
				[authData.user.uid] : {
					uid: authData.user.uid,
					displayName: authData.user.displayName,
					email: authData.user.email,
					photoURL: authData.user.photoURL,
				}
			}
		};
		console.log('gameData: ', gameData);
									console.log('this: ', this);

		const gameID = base.push('games', {
			data: gameData
		}).then(data => {
			const slugRef = base.database().ref('slugs');
			const gameID = data.key;

			console.log('gameID in here: ', gameID);

			slugRef.once('value', (snapshot) => {
				const data = snapshot.val() || {};
				console.log('data: ', data);
				const slugCount = Object.keys(data).length;
				const gameSlug = hashids.encode(slugCount);
				console.log('gameSlug: ', gameSlug);
				base.post(`slugs/${gameSlug}`, {
					data: {
						id: gameID.key
					},
					then(err){
						if(!err){
							// this.goToGame(gameSlug);
						}
					}
				});
			});
		}).catch(err => {

		});
	}

	renderLogin() {
		return (
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to get started</p>
				<button className="google" onClick={() => this.authenticate('google')}>Log In with Google</button>
			</nav>
		)
	}
	renderTest() {
		return (
			<div>
				{Array.from(Array(10000).keys()).map(index => {
					return <pre key={index}>{hashids.encode(index)}</pre>
				})}
			</div>
		)
	}
	render() {
		return (
			<div>
				{ this.renderLogin() }
				<form className="game-selector" onSubmit={(e) => this.goToGame(e)}>
					<h2>Please Enter A Game</h2>
					<input type="text" required placeholder="Game Name" defaultValue={getFunName()} ref={(input) => { this.gameInput = input}} />
					<button type="submit">Visit Game →</button>
				</form>
				{/* { this.renderTest() } */}
			</div>
		)
	}
}
GamePicker.contextTypes = {
	router: React.PropTypes.object
}
export default GamePicker;
