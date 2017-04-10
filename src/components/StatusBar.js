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
			msg = me.uid === game.activePlayer ? 'You have control of the board.  Please select a clue.' : game.players[me.uid].displayName + ' has contol of the board';
		}
		return (
			<div className="status-bar">
				<h2>Status Bar</h2>
				<div className="message">{msg}</div>
			</div>
		)
	}
}
export default StatusBar;