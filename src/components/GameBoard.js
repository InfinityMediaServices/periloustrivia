import React from 'react';
import Clue from './Clue';

class GameBoard extends React.Component {
  render() {
    return (
      <div className="game-board">
      	<div className="category cat cat-1">
      		<div className="cat-title">Category Name</div>
      		<Clue difficulty={1}></Clue>
      		<Clue difficulty={2}></Clue>
      		<Clue difficulty={3}></Clue>
      		<Clue difficulty={4}></Clue>
      		<Clue difficulty={5}></Clue>
      	</div>
      	<div className="category cat cat-2">
      		<div className="cat-title">Category Name</div>
      		<Clue difficulty={1}></Clue>
      		<Clue difficulty={2}></Clue>
      		<Clue difficulty={3}></Clue>
      		<Clue difficulty={4}></Clue>
      		<Clue difficulty={5}></Clue>
      	</div>
      	<div className="category cat cat-3">
      		<div className="cat-title">Category Name</div>
      		<Clue difficulty={1}></Clue>
      		<Clue difficulty={2}></Clue>
      		<Clue difficulty={3}></Clue>
      		<Clue difficulty={4}></Clue>
      		<Clue difficulty={5}></Clue>
      	</div>
      	<div className="category cat cat-4">
      		<div className="cat-title">Category Name</div>
      		<Clue difficulty={1}></Clue>
      		<Clue difficulty={2}></Clue>
      		<Clue difficulty={3}></Clue>
      		<Clue difficulty={4}></Clue>
      		<Clue difficulty={5}></Clue>
      	</div>
      	<div className="category cat cat-5">
      		<div className="cat-title">Category Name</div>
      		<Clue difficulty={1}></Clue>
      		<Clue difficulty={2}></Clue>
      		<Clue difficulty={3}></Clue>
      		<Clue difficulty={4}></Clue>
      		<Clue difficulty={5}></Clue>
      	</div>
      	<div className="category cat cat-6">
      		<div className="cat-title">Category Name</div>
      		<Clue difficulty={1}></Clue>
      		<Clue difficulty={2}></Clue>
      		<Clue difficulty={3}></Clue>
      		<Clue difficulty={4}></Clue>
      		<Clue difficulty={5}></Clue>
      	</div>

      </div>
    )
  }
}

export default GameBoard;
