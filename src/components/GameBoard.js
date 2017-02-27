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
								difficulty={clueNum} 
								clue={cat.clues[clueNum].clue}
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



				{/*
				<div className="category cat cat-1">
					<div className="cat-title">Category Name</div>
					<Clue difficulty={1}></Clue>
					<Clue difficulty={2}></Clue>
					<Clue difficulty={3}></Clue>
					<Clue difficulty={4}></Clue>
					<Clue difficulty={5}></Clue>
				</div>
				<div className="category cat cat-2">
					<div className="cat-title">Category Name</div>
					<Clue difficulty={1}></Clue>
					<Clue difficulty={2}></Clue>
					<Clue difficulty={3}></Clue>
					<Clue difficulty={4}></Clue>
					<Clue difficulty={5}></Clue>
				</div>
				<div className="category cat cat-3">
					<div className="cat-title">Category Name</div>
					<Clue difficulty={1}></Clue>
					<Clue difficulty={2}></Clue>
					<Clue difficulty={3}></Clue>
					<Clue difficulty={4}></Clue>
					<Clue difficulty={5}></Clue>
				</div>
				<div className="category cat cat-4">
					<div className="cat-title">Category Name</div>
					<Clue difficulty={1}></Clue>
					<Clue difficulty={2}></Clue>
					<Clue difficulty={3}></Clue>
					<Clue difficulty={4}></Clue>
					<Clue difficulty={5}></Clue>
				</div>
				<div className="category cat cat-5">
					<div className="cat-title">Category Name</div>
					<Clue difficulty={1}></Clue>
					<Clue difficulty={2}></Clue>
					<Clue difficulty={3}></Clue>
					<Clue difficulty={4}></Clue>
					<Clue difficulty={5}></Clue>
				</div>
				<div className="category cat cat-6">
					<div className="cat-title">Category Name</div>
					<Clue difficulty={1}></Clue>
					<Clue difficulty={2}></Clue>
					<Clue difficulty={3}></Clue>
					<Clue difficulty={4}></Clue>
					<Clue difficulty={5}></Clue>
				</div>
				*/}
			</div>
			)
	}
}


GameBoard.propTypes = {
	game: React.PropTypes.object.isRequired,
};


export default GameBoard;
