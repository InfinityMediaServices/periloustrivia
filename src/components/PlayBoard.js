import React from 'react';

class PlayBoard extends React.Component {
	constructor() {
		super();
		this.customMethod = this.customMethod.bind(this);
	}
	customMethod(key) {
	}
	render() {
		const game = this.props.game;
		if(!game || !game.phase || !game.currentClue){
			return <div className="play-board"></div>
		}
		const phase = game.phase;
		const clue = game.cats[game.currentClue.cat].clues[game.currentClue.clue];

		if(phase.isCluePresentation){	
			return (
				<div className="play-board">
					<h2>{clue.clue}</h2>
					<ul>
						{Object.keys(clue.q).map(q => {
							const clue = this.props.game.cats[game.currentClue.cat].clues[game.currentClue.clue];
							const className = clue.cq === parseInt(q, 10) ? 'answer-correct' : 'answer';
							return <li key={q} className={className}>{clue.q[q]}</li>
						})}
					</ul>
				</div>
			)
		} else {
			return <div className="play-board"></div>
		}
	}
}

PlayBoard.propTypes = {
	game: React.PropTypes.object.isRequired,
};

export default PlayBoard;
