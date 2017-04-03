import React from 'react';

class ScoreBoard extends React.Component {

	render() {
		const game = this.props.game;
		if (game.players === undefined) {
			return <div className="score-board"></div>
		}
		return (
			<div className="score-board">
				<h2>ScoreBoard </h2>
				<div className="players">
					<h3>Players</h3>
					<ul>
						{Object.keys(game.players).map(key => {
							return (
								<li key={key}>
								{/*
									<div className="playerImg">
									<img src={game.players[key].photoURL} alt={game.players[key].displayName}/>
									</div>
								*/}
									{game.players[key].displayName} {key === this.props.me.uid ? ' (you)' : ''}
								</li>
							)
						})}
						{
							!Object.keys(game.players).includes(this.props.me.uid)
							? <button onClick={()=>{ this.props.joinGame(this.props.me);  }}>Join Game</button>
							: ''
						}
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
