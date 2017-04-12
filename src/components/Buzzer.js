import React from 'react';

class Buzzer extends React.Component {
  render() {
		const game    = this.props.game;
		const me      = this.props.me;
		const isPhase = this.props.isPhase;
		const buzzIn  = this.props.buzzIn;

  	if(!game || !game.phase) {
  		return null;
  	}
		const isDisabled  = !isPhase('buzzIn');
    return (
    	<div className={ isDisabled ? "buzzer inactive" : "buzzer active" }>
	      <h2>Buzzer</h2>
				<button
					onClick={() => buzzIn(me)}
					className={ isDisabled ? "inactive" : "active" }
					disabled={ isDisabled ? "disabled" : null }
				> Buzz In </button>

    	</div>
    )
  }
}

Buzzer.propTypes = {
	game: React.PropTypes.object.isRequired,
	me: React.PropTypes.object.isRequired,
	isPhase: React.PropTypes.func.isRequired,
	buzzIn: React.PropTypes.func.isRequired,
};

export default Buzzer;
