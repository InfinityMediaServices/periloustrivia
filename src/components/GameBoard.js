import React from 'react';
import Clue from './Clue';

class GameBoard extends React.Component {

	constructor() {
		super();
		this.renderCategory = this.renderCategory.bind(this);
		this.renderDefault  = this.renderDefault.bind(this);
	}

	renderCategory(key) {
		const cat = this.props.game.cats[key];
		return (
			<div key={key} className={`category cat cat-${key}`}>
				<div className="cat-title">{cat.catTitle}</div>
				{Object.keys(cat.clues).map(clueID => {
					return (
						<Clue
							key={clueID}
							cat={parseInt(key, 10)}
							clue={cat.clues[clueID].clue}
							clueID={clueID}
							difficulty={parseInt(clueID, 10)}
							selectClue={this.props.selectClue}
							active={this.props.game.phase.name === 'clueSelection' && this.props.game.activePlayer === this.props.me.uid}
						/>
					)
				})}
			</div>
		)
	}

	renderDefault(){
		const catIds = Object.keys(this.props.game.cats);
		return (
			<div className="game-board">
				{catIds.map(this.renderCategory)}
			</div>
		)

	}

	render() {
		const game = this.props.game;
		if (!game || !game.phase || !game.phase.name ) {
			return null;
		}
		if (this.props.gameOn()){
			return this.renderDefault();
		}
		return null;
	}
}

GameBoard.propTypes = {
	game: React.PropTypes.object.isRequired,
	me: React.PropTypes.object.isRequired,
	startGame: React.PropTypes.func.isRequired,
	selectClue: React.PropTypes.func.isRequired,
	gameOn: React.PropTypes.func.isRequired,
	isPhase: React.PropTypes.func.isRequired,
};

export default GameBoard;
