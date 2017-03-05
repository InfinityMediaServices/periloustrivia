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
			<div key={key} className="category cat cat-{key}">
				<div className="cat-title">{cat.catTitle}</div>
				{Object.keys(cat.clues).map((clueNum) => {
					return (
						<Clue 
							key={clueNum} 
							difficulty={parseInt(clueNum, 10)} 
							clue={cat.clues[clueNum].clue}
							selectClue={this.props.selectClue}
						/>
					)
				})}
			</div>
		)
	}
	render() {
		console.log(this.props);
		if(!this.props.game.cats){
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
