import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './css/style.styl';
import App from './components/App';
import GamePicker from './components/GamePicker';
import NotFound from './components/NotFound';


const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" component={GamePicker} />
        <Route path="/game/:gameSlug" component={App} />
        <Route component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#main'));
