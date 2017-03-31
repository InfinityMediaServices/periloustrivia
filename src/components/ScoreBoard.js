import React from 'react';

class ScoreBoard extends React.Component {

	render() {
		if (this.props.game.activePlayer === undefined) {
			return <div className="score-board"></div>
		}
		return (
			<div className="score-board">
				<h2>ScoreBoard </h2>
			</div>
		)
	}
}

export default ScoreBoard;
