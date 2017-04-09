import React from 'react';

class Clue extends React.Component {
	render() {
		return (
			<div className="clue">
				<button
					onClick={() => this.props.selectClue(this.props.cat, this.props.clueID)}
					className={this.props.active ? "active" : "inactive"}
					disabled={!this.props.active ? "disabled" : null}
				>
					{this.props.difficulty * 100}
				</button>
			</div>
		)
	}
	static propTypes = {
		cat: React.PropTypes.number.isRequired, // {key}
		clue: React.PropTypes.string.isRequired, // {cat.clues[clueID].clue}
		clueID: React.PropTypes.string.isRequired, // {clueID}
		difficulty: React.PropTypes.number.isRequired, // {parseInt(clueID, 10)}
		selectClue: React.PropTypes.func.isRequired, // {this.props.selectClue}
		active: React.PropTypes.bool.isRequired, // {this.props.selectClue}
	};
}

export default Clue;
