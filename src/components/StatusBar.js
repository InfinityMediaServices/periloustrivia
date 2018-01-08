import React from 'react';
class StatusBar extends React.Component {
	render() {
		const game = this.props.game;
		const me   = this.props.me;
		if (!game || !game.phase) {
			return null;
		}
		let msg = '';
		const phase = this.props.game.phase;
		if(phase.isClueSelection){
			msg = me.uid === game.activePlayer ?
				'You have control of the board.  Please select a clue.' :
				game.players[game.activePlayer].displayName + ' has control of the board';
		} else if (phase.isQuestionSelect) {
			msg = me.uid === game.activePlayer ?
				'Please Pick a question.' :
				game.players[game.activePlayer].displayName + ' is attempting to answer';
		}
		return (
			<div className="status-bar">
				<h2>Status Bar</h2>
				<div className="message">{msg}</div>
				<pre>Game Phase: {phase.name}</pre>
				<pre>Active Player: {JSON.stringify(game.players[game.activePlayer], null, 2)}</pre>
			</div>
		)
	}
}
export default StatusBar;