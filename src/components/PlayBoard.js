import React from 'react';

class PlayBoard extends React.Component {
	constructor() {
		super();
		this.customMethod = this.customMethod.bind(this);
	}
	customMethod(key) {
	}
	render() {
		if(!this.props.game || !this.props.game.phase){
			return null;
		}
		const game = this.props.game;
		const phase = game.phase;

		if(phase.isCluePresentation){	
			return (
				<div className="play-board">
					<h2>{game.cats[game.currentClue.cat].clues[game.currentClue.clue].clue}</h2>
				</div>
			)
		} else {
			return (
				<div className="play-board">
				</div>
			)

		}
	}
}

PlayBoard.propTypes = {
	game: React.PropTypes.object.isRequired,
};

export default PlayBoard;
