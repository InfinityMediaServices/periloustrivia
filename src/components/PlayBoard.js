import React from 'react';

class PlayBoard extends React.Component {

	constructor() {
		super();
		this.renderCluePresentation = this.renderCluePresentation.bind(this);
		this.renderBuzzIn           = this.renderBuzzIn.bind(this);
		this.renderQuestionSelect   = this.renderQuestionSelect.bind(this);
	}

	renderCluePresentation(){
		const game = this.props.game;
		const clue = game.cats[game.currentClue.cat].clues[game.currentClue.clue];
		return (
			<div className="play-board">
				<h2>{clue.clue}</h2>
			</div>
		)
	}

	renderBuzzIn(){
		return this.renderCluePresentation();
	}

	renderQuestionSelect(){
		const game = this.props.game;
		const me = this.props.me;
		const clue = game.cats[game.currentClue.cat].clues[game.currentClue.clue];
		let body = ''
		if(game.activePlayer === me.uid) {
			body = <ul>
					{Object.keys(clue.q).map(q => {
						q = parseInt(q, 10)
						const clue = this.props.game.cats[game.currentClue.cat].clues[game.currentClue.clue];
						const className = clue.cq === q ? 'answer-correct' : 'answer';
						return <li key={q} className={className}>
							<button onClick={() => this.props.selectQuestion(q)}>
								{clue.q[q]}
							</button>
						</li>

						// return <li key={q} className={className}>{clue.q[q]}</li>
					})}
				</ul>
		} else {
			body = null
		}

		return (
			<div className="play-board">
				<h2>{clue.clue}</h2>
				{ body }
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
		} else if(phase.isBuzzIn){
			return this.renderBuzzIn()
		} else if(phase.isQuestionSelect){
			return this.renderQuestionSelect()
		}
		return <div className="play-board dormant"></div>
	}
}

PlayBoard.propTypes = {
	game: React.PropTypes.object.isRequired,
	me: React.PropTypes.object.isRequired,
};

export default PlayBoard;
