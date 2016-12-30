import React from 'react';
// import Header from './Header';
// import Order from './Order';
// import Inventory from './Inventory';
// import Fish from './Fish';
// import sampleFishes from '../sample-fishes';
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
}






App.propTypes = {
	params: React.PropTypes.object.isRequired
}

export default App;


