import React from 'react';

class Timer extends React.Component {
	render() {
		const t = this.props.timer;
		console.log('t: ', t);
		if (!t || t.i === undefined || t.d === undefined || t.e === undefined) {
			return null;
		}
		return (
			<div className="timer">
				<h2>Timer</h2>
				Elapsed { Math.floor(t.e / 1000) } of { Math.floor(t.d / 1000) } seconds
			</div>
		)
	}
}

export default Timer;
