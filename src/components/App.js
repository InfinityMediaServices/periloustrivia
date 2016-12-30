import React from 'react';
import base from '../base';

import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import Buzzer from './Buzzer';
import Timer from './Timer';
import StatusBar from './StatusBar';


class App extends React.Component {
	constructor() {
		super();
		this.customMethod = this.customMethod.bind(this);
	}
	customMethod(param) {
	}

	render() {
		return (
			<div className="perilious-trivia">
				<GameBoard />
				<ScoreBoard />
				<Buzzer />
				<Timer />
				<StatusBar />
			</div>
		)
	}


	componentWillMount() {
		// this runs right before the <App> is rendered
		this.ref = base.syncState(`${this.props.params.gameId}/games`, {
			context: this,
			state: 'games'
		});

		// check if there is any game in localStorage
		const localStorageRef = localStorage.getItem(`game-${this.props.params.gameId}`);

		if(localStorageRef) {
			// update our App component's game state
			this.setState({
				game: JSON.parse(localStorageRef)
			});
		}

	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`game-${this.props.params.gameId}`, JSON.stringify(nextState.game));
	}










}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}

export default App;


