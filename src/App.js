import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Library from './components/Library'
import Login from './components/Login'
import SignUp from './components/SignUp'
import SongHome from './components/SongHome'
import NewRecordingDevice from './components/NewRecordingDevice'
import NewLibrary from './components/NewLibrary'
import { api } from "./services/api";

class App extends Component {

  state = {
    auth: {
      user: { 
        collections: [],
        id: null,
        songs: [],
        username: ''
       }
    },
    selectedCollectionId: '',  
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      api.auth.getCurrentUser().then(user => {
        const updatedState = { ...this.state.auth, user: user };
        this.setState({ 
          auth: updatedState,
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

  addCollection = (collectionName, userId) => {
    api.collections.addCollection(collectionName, userId)
    .then(data => this.setState({ ...this.state, auth: { user: data }  }))
  }

  addSong = (songTitle, collectionId) => {
    api.songs.addSong(songTitle, collectionId)
    .then(data => this.setState({ ...this.state, auth: { user: data } }))
  }

  collectionSelect = (id) => {
    this.setState({...this.state, selectedCollectionId: id})
  }

  render() {
    const { user } = this.state.auth
    const { selectedCollectionId } = this.state
    const songs = user.songs.filter(song => {
      if (selectedCollectionId === ''){
        return song
      } else {
        if(song.collection_id === parseInt(selectedCollectionId)){
          return song 
        }
      }
    })


    return (
      <div >
        <Router>
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
    
          {/* <Route
              path="/home"
              exact
              render={(props) => <Library 
                {...props} 
                onAddCollection={this.addCollection} 
                onAddSong={this.addSong}
                collections={user.collections} 
                songs={user.songs} 
                user={user} />}
            /> */}

          <Route
              path="/lib"
              exact
              render={(props) => <NewLibrary 
                {...props} 
                collections={user.collections}
                onCollectionSelect={this.collectionSelect}
                songs={songs}
               />}
            />

          <Route
              path="/songs/:id"
              exact
              render={(props) => <SongHome {...props} />}
            />

          <Route
              path="/recording"
              exact
              render={(props) => <NewRecordingDevice {...props}  />}
            />

    
        </Router>
      </div>
    );

  }
}

export default App;
