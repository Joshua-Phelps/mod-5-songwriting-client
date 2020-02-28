import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar'
// import Library from './components/Library'
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
        username: '',
        versions : []
       }
    },
    selectedCollectionId: false,
    selectedSong: {collection_id: null, id: null, lyrics: null, title: null},  
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
    const updatedState = { ...this.state.auth, user: data.user }
    // const updatedState = { ...this.state.auth, user: {id: data.id,  username: data.username} };
    localStorage.setItem("token", data.jwt);
    this.setState({ auth: updatedState });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      auth: {
        user: { 
          collections: [],
          id: null,
          songs: [],
          username: '',
          numberOfCollections: null
         }
      },
      selectedCollectionId: false,
      selectedSong: false   
    });
  };

  addCollection = (collectionName, userId) => {
    api.collections.addCollection(collectionName, userId)
    .then(data => this.setState({ ...this.state, auth: { user: data }  }))
    // .then(data => this.setState({ ...this.state, auth: { user: { ...this.state.auth.user, collections: data } } } ))
  }

  editCollection = (collectionName, collectionId) => {
    api.collections.editCollection(collectionName, collectionId)
    .then(data => this.setState({ ...this.state, auth: { user: data }  }))
  }

  deleteCollection = (id) => {
    api.collections.deleteCollection(id)
    .then(data => this.setState({ ...this.state, auth: { user: data }  }))
  }

  addSong = (songTitle, collectionId) => {
    api.songs.addSong(songTitle, collectionId)
    .then(data => this.setState({ ...this.state, auth: { user: data } }))
  }

  editSong = (songTitle, collectionId, songId) => {
    api.songs.editSong(songTitle, collectionId, songId)
    .then(data => this.setState({ ...this.state, auth: { user: data } }))
    // .then(data => console.log(data))
  }

  deleteSong = (songId) => {
    api.songs.deleteSong(songId)
    .then(data => this.setState({ ...this.state, auth: { user: data } }))
  }

  collectionSelect = (id) => {
    this.setState({...this.state, selectedCollectionId: id})
  }

  selectSong = (stringId) => {
    const id = parseInt(stringId)
    const song = this.state.auth.user.songs.filter(song => song.id === id )
    this.setState({selectedSong: song})
  }



  render() {
    const { user } = this.state.auth
    const { selectedCollectionId } = this.state
    // you should rewrite this method - looks ugly 
    const songs = user.songs.filter(song => {
      if (!selectedCollectionId){
        return song
      } else {
        if(song.collection_id === selectedCollectionId){
          return song 
        }
      }
    })
    // const songs = []

    return (
      <div >
        <Router>
          <Route
              path="/"
              render={props => <NavBar {...props} user={user} onLogout={this.logout} onLogin={this.login} />}
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
              render={(props) => <NewLibrary 
                {...props} 
                collections={user.collections}
                onCollectionSelect={this.collectionSelect}
                onAddCollection={this.addCollection}
                onAddSong={this.addSong}
                onEditSong={this.editSong}
                userId={user.id}
                songs={songs}
                onDeleteSong={this.deleteSong}
                onEditCollection={this.editCollection}
                onDeleteCollection={this.deleteCollection}
                onSelectSong={this.selectSong}
               />}
            />

          <Route
              path="/songs/:id"
              exact
              render={(props) => <SongHome onSelectSong={this.selectSong} song={this.state.selectedSong} {...props} />}
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
