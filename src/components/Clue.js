import React from 'react';

class Clue extends React.Component {
  render() {
    return (
      <h2>{this.props.difficulty * 100}</h2>
    )
  }
}

export default Clue;
