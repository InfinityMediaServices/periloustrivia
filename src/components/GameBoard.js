import React from 'react';
import PropTypes from 'prop-types';
import Clue from './Clue';

class GameBoard extends React.Component {

	constructor() {
		super();
		this.renderCategory = this.renderCategory.bind(this);
		this.renderDefault  = this.renderDefault.bind(this);
	}

	renderCategory(key) {
		key = parseInt(key, 10);
		const cat = this.props.game.cats[key];
		return (
			<div key={key} className={`category cat cat-${key}`}>
				<div className="cat-title">
					<div className="cat-title-inner">
						<span>{cat.catTitle}</span>
					</div>
				</div>
				{Object.keys(cat.clues).map(clueID => {
					clueID = parseInt(clueID, 10);
					return (
						<Clue
							key={clueID}
							catID={key}
							clueID={clueID}
							clue={cat.clues[clueID]}
							difficulty={clueID}
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
	game: PropTypes.object.isRequired,
	me: PropTypes.object.isRequired,
	selectClue: PropTypes.func.isRequired,
	gameOn: PropTypes.func.isRequired,
	isPhase: PropTypes.func.isRequired,
};

export default GameBoard;
