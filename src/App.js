import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import CompanyDetail from './CompanyDetail';
import Repos from './Repos';
import Contributors from './Contributors'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container-fluid">
          <header>
            <Header />
          </header>
          <div className="App-intro">

            <CompanyDetail />
            <Switch>
            <Route exact path="/Repos" component={Repos} />
            <Route exact path="/internal" component={Contributors} />
             <Route exact path="/external" component={Contributors} />
            </Switch>

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
