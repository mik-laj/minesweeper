import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Minesweeper from './pages/Minesweeper'
import MainPage from './pages/MainPage'
import Score from './pages/Score'
import Settings from './components/settings/Settings'

const App = () => {

  return (
    <div>
      <Settings />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/game' component={Minesweeper} />
          <Route exact path='/score' component={Score} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
