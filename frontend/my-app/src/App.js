import React, { Component } from 'react';
import QuestionView from './components/QuestionView';
import CreateQuestion from './components/CreateQuestion';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={CreateQuestion} />
          <Route path="/:key" component={QuestionView} />
          
        </div>
      </Router>
    );
  }
}

export default App;
