import React from 'react';

class Clue extends React.Component {
	render() {
		return (
			<div className="clue">
				<button onClick={() => this.props.selectClue(this.props.cat, this.props.clueID)}>
					{this.props.difficulty * 100}
				</button>
				{/*
				<div className="clue-view">
					<div className="clue-text">
						{this.props.clue}
					</div>
				</div>
				*/}
			</div>
		)
	}
	static propTypes = {
		clueID: React.PropTypes.string.isRequired, // {clueID}
		difficulty: React.PropTypes.number.isRequired, // {parseInt(clueID, 10)}
		cat: React.PropTypes.number.isRequired, // {key}
		clue: React.PropTypes.string.isRequired, // {cat.clues[clueID].clue}
		selectClue: React.PropTypes.func.isRequired, // {this.props.selectClue}
	};
}

export default Clue;
