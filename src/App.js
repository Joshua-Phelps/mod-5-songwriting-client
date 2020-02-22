import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Library from './components/Library'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { api } from "./services/api";

class App extends Component {

  state = {
    auth: {
      user: {}
    },
    collections: null, 
    songs: null, 
    versions: null 
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      // console.log('there is a token');
      // make a request to the backend and find our user
      api.auth.getCurrentUser().then(user => {
        // console.log(user)
        const updatedState = { ...this.state.auth, user: user };
        this.setState({ auth: updatedState });
      });
    }
  }

  login = data => {
    const updatedState = { ...this.state.auth, user: {id: data.id,  username: data.username} };
    localStorage.setItem("token", data.jwt);
    this.setState({ auth: updatedState });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ auth: { user: {} } });
  };
  
  signup = () => {

  }

  render() {
    return (
      <div >
        <Router>
          <NavBar />

          <Route
              path="/login"
              exact
              render={props => <Login {...props} onLogin={this.login} />}
            />

          <Route
              path="/signup"
              exact
              render={props => <SignUp {...props} />}
            />
    
          <Route
              path="/collections"
              exact
              render={(props) => <Library {...props} onLogin={this.login} />}
            />
    
        </Router>
      </div>
    );

  }
}

export default App;
