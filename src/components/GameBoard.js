import React from 'react';
import Clue from './Clue';

class GameBoard extends React.Component {
	constructor() {
		super();
		this.renderCategory = this.renderCategory.bind(this);
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
							clueID={clueID}
							difficulty={parseInt(clueID, 10)}
							cat={key}
							clue={cat.clues[clueID].clue}
							selectClue={this.props.selectClue}
						/>
					)
				})}
			</div>
		)
	}
	render() {
		if(!this.props.game.cats || !this.props.game.phase || !this.props.game.phase.isInit){
			return null;
		}
		const catIds = Object.keys(this.props.game.cats);
		return (
			<div className="game-board">
		        {catIds.map(this.renderCategory)}
			</div>
		)
	}
}

GameBoard.propTypes = {
	game: React.PropTypes.object.isRequired,
};

export default GameBoard;
