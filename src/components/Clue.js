import React from 'react';

class Clue extends React.Component {
	render() {
		const isDisabled = !this.props.active || this.props.clue.dead
		return (
			<div className="clue">
				<button
					onClick={() => this.props.selectClue(this.props.catID, this.props.clueID)}
					className={!isDisabled ? "active" : "inactive"}
					disabled={isDisabled ? "disabled" : null}
				>
					{this.props.difficulty * 100}
				</button>
			</div>
		)
	}
	static propTypes = {
		catID: React.PropTypes.number.isRequired, // {key}
		clueID: React.PropTypes.number.isRequired, // {clueID}
		clue: React.PropTypes.object.isRequired, // {cat.clues[clueID].clue}
		difficulty: React.PropTypes.number.isRequired, // {parseInt(clueID, 10)}
		selectClue: React.PropTypes.func.isRequired, // {this.props.selectClue}
		active: React.PropTypes.bool.isRequired, // {this.props.selectClue}
	};
}

export default Clue;
