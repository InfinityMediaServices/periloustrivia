import React from 'react';
import { getFunName } from '../helpers';

class GamePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToGame = this.goToGame.bind(this);
  // }

  goToGame(event) {
    event.preventDefault();
    console.log('You Changed the URL');
    // first grab the text from the box
    const gameId = this.gameInput.value;
    console.log(`Going to ${gameId}`)
    // second we're going to transition from / to /game/:gameId
    this.context.router.transitionTo(`/game/${gameId}`);
  }

  render() {
    // Any where else
    return (
      <form className="game-selector" onSubmit={(e) => this.goToGame(e)}>
        <h2>Please Enter A Game</h2>
        <input type="text" required placeholder="Game Name" defaultValue={getFunName()} ref={(input) => { this.gameInput = input}} />
        <button type="submit">Visit Game →</button>
      </form>
    )
  }
}

GamePicker.contextTypes = {
  router: React.PropTypes.object
}

export default GamePicker;
