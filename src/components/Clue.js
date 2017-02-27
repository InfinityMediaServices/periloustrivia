import React from 'react';

class Clue extends React.Component {
	render() {
		return (
			<div className="clue">
				<button>{this.props.difficulty * 100}</button>
				<div className="clue-view">
					<div className="clue-text">
						{this.props.clue}
					</div>
				</div>
			</div>
		)
	}
	static propTypes = {
		clue: React.PropTypes.string.isRequired,
		difficulty: React.PropTypes.number.isRequired
	};
}

export default Clue;
