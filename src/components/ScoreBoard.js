import React from 'react';

class ScoreBoard extends React.Component {

	constructor() {
		super();
		this.renderCTA = this.renderCTA.bind(this);
		this.renderSummary = this.renderSummary.bind(this);
	}

	renderCTA() {
		const game = this.props.game;
		const me = this.props.me;
		console.log('me: ', me);
		const player = this.props.player;
		if(!player || !player.uid){
			return <li> Login above to join game </li>
		}
		if(!Object.keys(game.players).includes(me.uid)) {
			return (
				<li>
					You are logged in and ready to <button onClick={()=>{ this.props.joinGame(player);  }}> Join Game </button>
				</li>
			)
		}
		return ''
	}
	renderSummary() {
		const game = this.props.game;
		const playerCount = Object.keys(game.players).length;
		if (!game.round) {
			return (<div>
				<h2>There are now {playerCount} players.</h2>
				{playerCount < 4 ? <p>You can add up to 4 players</p> : ''}
				{playerCount < 2 ? <p> You must have at least 2 players </p> : ''}
				<p> To invite more players to the game, please send them to this url <a href={window.location.toString()}>{window.location.toString()}</a> </p>
			</div> )
		}
		return null;
	}

	render() {
		const game = this.props.game;
		const me = this.props.me;
		if (!game.players) {
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
							const score = game.players[key].score || 0;
							if (!game.players[key]) {
								return null
							}
							let subText = null;
							console.log('game.players[key]: ', game.players[key]);
							if(game.round > 0) {
								subText = "$" + score;

							} else if(game.players[key].isReady) {
								subText = "Confirmed and ready to play";
							} else if (playerCount < 2) {
								subText = "Waiting for other players to join";
							} else {
								subText = "Waiting to confirm readiness to play";
							}
							console.log('me.isReady: ', me.isReady);
							return (
								<li key={key} className={key === me.uid ? 'player-me' : 'player-other'}>
									{/*
										<div className="playerImg">
										<img src={game.players[key].photoURL} alt={game.players[key].displayName}/>
										</div>
									*/}
									{game.players[key].displayName}
									{key === me.uid ? <span className="is-self"> (you) </span> : null}
									<span> </span>
									<strong>{ subText }</strong>
									{key === me.uid && !me.isReady ? <span> If you are ready to begin the game <button onClick={()=>{ this.props.startGame(this.props.me);  }}>Press Here to begin</button> </span> : ''}
								</li>
							)
						})}
						{ this.renderCTA() }
					</ul>
					{ this.renderSummary() }

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
