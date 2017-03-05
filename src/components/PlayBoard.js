import React from 'react';

class PlayBoard extends React.Component {
	constructor() {
		super();
		this.customMethod = this.customMethod.bind(this);
	}
	customMethod(key) {
	}
	render() {
		if(!this.props.game.phase){
			return null;
		}
		console.log('this.props.game.phase: ', this.props.game.phase);
		if(this.props.game.phase.isCluePresentation){	
			return (
				<div className="play-board">
					<h2>hello</h2>
				</div>
			)
		} else {
			return (
				<div className="play-board">
				</div>
			)

		}
	}
}

PlayBoard.propTypes = {
	game: React.PropTypes.object.isRequired,
};

export default PlayBoard;
