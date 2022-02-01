import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Main from './views/Main';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Main>
            <Switch>
              <Route path='/'>
                <Dashboard />
              </Route>
            </Switch>
          </Main>
        </BrowserRouter>
    </div>
  );
}

export default App;
