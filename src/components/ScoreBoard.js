import React from 'react';

class ScoreBoard extends React.Component {

	constructor() {
		super();
		this.renderCTA = this.renderCTA.bind(this);
	}

	renderCTA() {
		const game = this.props.game;
		const me = this.props.me;
		if(!me.uid){
			return <li> Login above to join game </li>
		}
		if(!Object.keys(game.players).includes(me.uid)) {
			return (
				<li>
					<button onClick={()=>{ this.props.joinGame(me);  }}>
						Join Game
					</button>
				</li>
			)
		}
		return ''
	}

	render() {
		const game = this.props.game;
		const me = this.props.me;
		if (game.players === undefined) {
			return <div className="score-board"></div>
		}
		const playerCount = Object.keys(game.players).length;
		return (
			<div className="score-board">
				<h2>ScoreBoard </h2>
				<div className="players">
					<h3>Players</h3>
					<ul>
						{Object.keys(game.players).map(key => {
							if (!game.players[key]) {
								return null
							}
							return (
								<li key={key}>
								{/*
									<div className="playerImg">
									<img src={game.players[key].photoURL} alt={game.players[key].displayName}/>
									</div>
								*/}
									{game.players[key].displayName}
									{key === me.uid ? ' (you)' : ''} -
									{
										game.players[key].isReady ?
											<strong> Confirmed and ready to play </strong>
										:
											<strong>
												Waiting {playerCount < 2 ? 'for other players to join' : 'to confirm readiness to play' }
											</strong>
									}
								</li>
							)
						})}
						{ this.renderCTA() }
					</ul>
					<p>
						To invite more players to the game, please send them to this url <a href={window.location.toString()}>{window.location.toString()}</a>
					</p>
				</div>
			</div>
		)
	}
}

ScoreBoard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

ScoreBoard.propTypes = {
	game: React.PropTypes.object.isRequired,
	me: React.PropTypes.object.isRequired,
	joinGame: React.PropTypes.func.isRequired,
};

export default ScoreBoard;
