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
		const game = this.props.game;
		if(game && game.players && Object.keys(game.players).length >= 2){
			return (
				<div className="game-board">
					<h2>There are now {Object.keys(game.players).length} players.</h2>
				</div>
			)
		}
		if(!game || !game.round){
			console.log('game: ', game);
			return (
				<div className="game-board">
					<h2>Please finalize players above and then press begin game</h2>
				</div>
			)
		}
		console.log('game.players: ', game.players);
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
	selectClue: React.PropTypes.func.isRequired,
	isPhase: React.PropTypes.func.isRequired,
};

export default GameBoard;
