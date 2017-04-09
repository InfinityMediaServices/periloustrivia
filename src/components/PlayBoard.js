import React from 'react';

class PlayBoard extends React.Component {

	constructor() {
		super();
		this.renderCluePresentation = this.renderCluePresentation.bind(this);
	}

	renderCluePresentation(){
		const game = this.props.game;
		const clue = game.cats[game.currentClue.cat].clues[game.currentClue.clue];
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
	}

	render() {
		const game = this.props.game;
		if(!game || !game.phase){
			return null;
		}
		const phase = game.phase;

		if(phase.isCluePresentation){
			return this.renderCluePresentation()
		}
		return <div className="play-board dormant"></div>
	}
}

PlayBoard.propTypes = {
	game: React.PropTypes.object.isRequired,
	me: React.PropTypes.object.isRequired,
};

export default PlayBoard;
