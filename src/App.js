import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Library from './components/Library'
import Login from './components/Login'
import SignUp from './components/SignUp'
import SongHome from './components/SongHome'
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
      api.auth.getCurrentUser().then(user => {
        const updatedState = { ...this.state.auth, user: user };
        this.setState({ 
          auth: updatedState,
          collections: user.collections 
         });
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
  

  render() {
    const { collections, songs, versions } = this.state
    const { user } = this.state.auth

    return (
      <div >
        <Router>
          {/* <NavBar  /> */}

          <Route
              path="/"
              render={props => <NavBar {...props} user={user} onLogin={this.login} />}
            />

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
              path="/home"
              exact
              render={(props) => <Library {...props} collections={collections} songs={user.songs} user={user} />}
            />

          <Route
              path="/songs/:id"
              exact
              render={(props) => <SongHome {...props} collections={collections} songs={user.songs} user={user} />}
            />

    
        </Router>
      </div>
    );

  }
}

export default App;
