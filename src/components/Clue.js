import React from 'react';
import PropTypes from 'prop-types';

class Clue extends React.Component {
	render() {
		const isDisabled = !this.props.active || this.props.clue.dead
		return (
			<div className="clue">
				<button
					onClick={() => this.props.selectClue(this.props.catID, this.props.clueID)}
					className={"clue-button " + (!isDisabled ? "active" : "inactive")}
					disabled={isDisabled ? "disabled" : null}
				>
					{this.props.difficulty * 100}
				</button>
			</div>
		)
	}
	static propTypes = {
		catID: PropTypes.number.isRequired, // {key}
		clueID: PropTypes.number.isRequired, // {clueID}
		clue: PropTypes.object.isRequired, // {cat.clues[clueID].clue}
		difficulty: PropTypes.number.isRequired, // {parseInt(clueID, 10)}
		selectClue: PropTypes.func.isRequired, // {this.props.selectClue}
		active: PropTypes.bool.isRequired, // {this.props.selectClue}
	};
}

export default Clue;
