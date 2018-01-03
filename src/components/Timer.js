import React from 'react';

class Timer extends React.Component {
	render() {
		const t = this.props.timer;
		console.log('t: ', t);
		if (!t || t.ticks === undefined || t.totalTicks === undefined) {
			return null;
		}
		const { ticks, totalTicks } = t;
		return (
			<div className="timer">
				<h2>Timer</h2>
				Elapsed { totalTicks - ticks  } of { totalTicks } seconds
				<pre>{JSON.stringify(t)}</pre>
			</div>
		)
	}
}

export default Timer;
