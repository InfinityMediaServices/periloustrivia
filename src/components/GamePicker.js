import React from 'react';
import PropTypes from 'prop-types';
import { firebaseApp, base } from '../base';
import firebase from 'firebase';
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
		this.authenticate = this.authenticate.bind(this);
		this.logout = this.logout.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.createGame = this.createGame.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.state = {
			uid: null,
			user: null,
		}
	}

	componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({ user });
      }
    });
	}

	goToGame(event) {
		event.preventDefault();
		// // console.log('You Changed the URL');
		// first grab the text from the box
		const gameId = this.gameInput.value;
		// // console.log(`Going to ${gameId}`)
		// second we're going to transition from / to /game/:gameId
		this.context.router.transitionTo(`/game/${gameId}`);
	}

	authenticate(providerName) {

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(this.authHandler);




	}

	logout() {
		firebaseApp.auth().signOut();
		this.setState({ uid: null });
	}

	authHandler(authData, err)  {
		// // console.log('authData: ', authData);
		if (err) {
			console.error(err);
			return;
		}
		// this.createGame(authData.user);

		this.setState({
			uid: authData.user.uid,
			user: authData.user
		});
	}

	createGame(owner){
		// return authData;
    // console.log({owner});
		const gameData = {
			players: {
				[owner.uid] : {
					uid: owner.uid,
					displayName: owner.displayName,
					email: owner.email,
					photoURL: owner.photoURL,
				}
			},
			owner: owner.uid,
			game: {}
		};
		// TODO: refactor gameData: re-scope owner & players
		base.push('games', {
			data: gameData
		}).then(data => {
      console.log({data});
			const slugRef = firebase.database().ref('slugs');
			const gameID = data.key;
			// TODO: fix to promise approach here
			slugRef.once('value', (snapshot) => {
				const data = snapshot.val() || {};
				// // console.log('data: ', data);
				const slugCount = Object.keys(data).length;
				const gameSlug = hashids.encode(slugCount);
				// // console.log('gameSlug: ', gameSlug);
				base.post(`slugs/${gameSlug}`, {
					data: {
						id: gameID
					}
				}).then(() => {
					// // console.log('gameSlug in here: ', gameSlug);
					// // console.log('gameID in here: ', gameID);
					this.context.router.transitionTo(`/game/${gameSlug}`);
				}).catch(err => {});
			});
		}).catch(err => {
			console.error(err);
		});

	}

	renderLogin() {
		return (
			<nav className="login">
				<h2>The first step is to sign in:</h2>
				<button className="google" onClick={() => this.authenticate('google')}>Log In with Google</button>
			</nav>
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
			return (
				<div>
					<span className="displayName"> {this.state.user.displayName} </span>
					{ logout }
					<form className="game-selector" onSubmit={e => this.goToGame(e)}>
						<h2>Join an Existing game</h2>
						<input type="text" required placeholder="Game Slug" ref={(input) => { this.gameInput = input}} />
						<button type="submit">Go To Game →</button>
					</form>
					<p>
						<button onClick={()=>{ this.createGame(this.state.user);  }}>Create a New Game</button>
					</p>
				</div>
			)
		}
	}
}
GamePicker.contextTypes = {
	router: PropTypes.object.isRequired
}
export default GamePicker;
