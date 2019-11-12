import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './all.css';
import ToDoList from './components/toDoApp'
import List from './components/List'
import Details from './components/Details'
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
// import config from './config/configKey'


// firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  gettingWholeData = () => {
    fetch('http://localhost:3001/')
      .then(res => {
        return res.json()
      })
      .then(users => {
        this.setState({ data: users })
      });
  }

  componentWillMount() {
    this.gettingWholeData()
  }

  render() {
    return (
      <div>
        <Router>
          <Route
            exact path="/"
            render={() => <ToDoList
              state={this.state}
              gettingWholeData={this.gettingWholeData}
            />} />
          <Route
            path="/List"
            render={() => <List
              state={this.state}
            />} />
          <Route
            path="/Details"
            render={() => <Details
              state={this.state}
              gettingWholeData={this.gettingWholeData}
            />} />
        </Router>
      </div>
    )
  }
}

export default App;
