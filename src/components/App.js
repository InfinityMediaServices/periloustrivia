import React from 'react';
// import Header from './Header';
// import Order from './Order';
// import Inventory from './Inventory';
// import Game from './Game';
// import sampleGames from '../sample-games';
import base from '../base';


class App extends React.Component {
	constructor() {
		super();
		this.customMethod = this.customMethod.bind(this);
	}
	customMethod(param) {
	}

  render() {
    return (
      <div className="perilious-trivia">
      sexy
      </div>
    )
  }


  componentWillMount() {
    // this runs right before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.gameId}/games`, {
      context: this,
      state: 'games'
    });

    // check if there is any game in localStorage
    const localStorageRef = localStorage.getItem(`game-${this.props.params.gameId}`);

    if(localStorageRef) {
      // update our App component's game state
      this.setState({
        game: JSON.parse(localStorageRef)
      });
    }

  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`game-${this.props.params.gameId}`, JSON.stringify(nextState.game));
  }










}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}

export default App;


