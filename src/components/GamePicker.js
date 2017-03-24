import React from 'react';
import base from '../base';
import Hashids  from 'hashids';

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
		this.createGame = this.createGame.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.pushChild = this.pushChild.bind(this);

		this.state = {
			uid: null
		}

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
		// this.createGame(authData.user);

    this.setState({
      uid: authData.user.uid
    });
	}

	createGame(owner){
		// return authData;
		const gameData = {
			players: {
				[owner.uid] : {
					uid: owner.uid, 
					displayName: owner.displayName,
					email: owner.email,
					photoURL: owner.photoURL,
				}
			},
			game: {}
		};
		const gameID = base.push('games', {
			data: gameData
		}).then(data => {
			const slugRef = base.database().ref('slugs');
			const gameID = data.key;
			// TODO: fix to promise approach here 
			slugRef.once('value', (snapshot) => {
				const data = snapshot.val() || {};
				console.log('data: ', data);
				const slugCount = Object.keys(data).length;
				const gameSlug = hashids.encode(slugCount);
				console.log('gameSlug: ', gameSlug);
				base.post(`slugs/${gameSlug}`, {
					data: {
						id: gameID
					}
				}).then(() => {
					console.log('gameSlug in here: ', gameSlug);
					console.log('gameID in here: ', gameID);
					// console.log('router: ', router);
					// console.log('router.transitionTo: ', router.transitionTo);
					this.context.router.transitionTo(`/game/${gameSlug}`);
				}).catch(err => {});
			});
		}).catch(err => {});

	}

	renderLogin() {
		return (
			<nav className="login">
				<h2>Sign in to create a new game</h2>
				<button className="google" onClick={() => this.authenticate('google')}>Log In with Google</button>

      <form className="game-selector" onSubmit={(e) => this.goToGame(e)}>
				<h2>Join an Existing game</h2>
        <input type="text" required placeholder="Game Slug" ref={(input) => { this.gameInput = input}} />
        <button type="submit">Go To Game →</button>
      </form>


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
    const logout = <button onClick={this.logout}>Log Out!</button>;

		if(!this.state.uid){
			return (
				<div>
					{ this.renderLogin() }
				</div>
			)
		} else {
			return logout;
		}
	}
}
GamePicker.contextTypes = {
	router: React.PropTypes.object
}
export default GamePicker;
