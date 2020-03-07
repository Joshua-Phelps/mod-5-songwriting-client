import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import NavBar from './components/NavBar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import SongHome from './components/SongHome'
import NewRecordingDevice from './components/NewRecordingDevice'
import NewLibrary from './components/NewLibrary'
import EditAccount from './components/EditAccount'
import { api } from "./services/api";


class App extends Component {

  constructor(){
    super()
    this.state = {
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
      search: ''  
    }
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
    .then(newCollection => this.setState(prevState => ({
      ...prevState, auth: {
          user: {
            ...prevState.auth.user, 
            collections: [newCollection, ...prevState.auth.user.collections]
          }
        }
    })))
  }

  editCollection = (collectionName, collectionId) => {
    api.collections.editCollection(collectionName, collectionId)
    .then(editedCollection => this.setState(prevState => ({
      ...prevState, auth : {
        user: {
          ...prevState.auth.user,
          collections: prevState.auth.user.collections.map(c => {
            if (c.id === editedCollection.id) return editedCollection
            return c
          })
        }
      }
    })))
  }

  deleteCollection = (id) => {
    api.collections.deleteCollection(id)
    // .then(() => this.setState(prevState => ({
    //   ...prevState, auth : {
    //     user: {
    //       ...prevState.auth.user,
    //       collections: prevState.auth.user.collections.filter(c => {
    //         if (c.id !== id) return c
    //       })
    //     }
    //   }
    // })))
    .then((data) => this.setState(prevState => ({
      ...prevState, auth : {
        user: {
          ...prevState.auth.user,
          collections: data.collections,
          songs: data.songs
        }
      }
    })))
    
  }

  addSong = (songTitle, collectionId) => {
    api.songs.addSong(songTitle, collectionId)
    .then(song => this.setState(prevState => ({
      ...prevState, auth: {
          user: {
            ...prevState.auth.user, 
            songs: [song, ...prevState.auth.user.songs]
          }
        }
    })))
  }

  editSong = (songTitle, collectionId, songId) => {
    api.songs.editSong(songTitle, collectionId, songId)
    .then(editedSong => this.setState(prevState => ({
      ...prevState, auth : {
        user: {
          ...prevState.auth.user,
          songs: prevState.auth.user.songs.map(song => {
            if (song.id === editedSong.id) return editedSong
            return song 
          })
        }
      }
    })))
  }

  deleteSong = (songId) => {
    api.songs.deleteSong(songId)
    .then(() => this.setState(prevState => ({
      ...prevState, auth : {
        user: {
          ...prevState.auth.user,
          songs: prevState.auth.user.songs.filter(song => {
            if (song.id !== songId) return song
          })
        }
      }
    })))
  }

  deleteAccount = (userId) => {
    api.account.deleteAccount(userId)
    .then(() => this.logout())
  }

  collectionSelect = (id) => {
    this.setState(prevState => ({...prevState, selectedCollectionId: id}))
  }

  selectSong = (stringId) => {
    const id = parseInt(stringId)
    const song = this.state.auth.user.songs.filter(song => song.id === id )
    this.setState({selectedSong: song})
  }

  setSongSearch = (value) => {
    this.setState(prevState => ({...prevState, search: value.toLowerCase()}))
  }

  tokenPathCheck = (props) => {
    const token = localStorage.getItem("token")
    const path = props.location.pathname.split('/')[1]
    if (token && path !== 'songs' && path !== 'edit-account' ){
      return true 
    } else 
      return false 
  }

  render() {
    const token = localStorage.getItem("token")
    const { user } = this.state.auth
    const { selectedCollectionId } = this.state
    const songsByCollection = user.songs.filter(song => {
      if (!selectedCollectionId) return song
      if(song.collection_id === selectedCollectionId) return song 
    })
    const songs = songsByCollection.filter(song => song.title.toLowerCase().includes(this.state.search))


    return (
      <div >
        <Router>
            <Route
            path="/login"
            exact
            render={props => console.log(props)}
            render={props => !token ? <Login {...props} onLogin={this.login} /> : <Redirect to="/home" />}
            />

            <Route
            path="/signup"
            exact
            render={props => !token ? <SignUp {...props} /> : <Redirect to="/home" />}
            />                                         
          
            <Route
            path="/"
            render={props => (token ? <NavBar {...props} user={user} onLogout={this.logout} onLogin={this.login} /> : (props.location.pathname !== "/signup" ? <Redirect to="/login" /> : <Redirect to="/signup" /> ))}
            />

            <Route
            path="/home"
            exact
            render={(props) => (token ? <NewLibrary 
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
              onSearch={this.setSongSearch}
              /> : <Redirect to="/login" />)}
            />

            <Route
              path="/songs/:id"
              exact
              render={(props) => ( token ? <SongHome onSelectSong={this.selectSong} username={user.username} {...props} /> : <Redirect to="/login" /> )}
            />

            <Route
              path="/recording"
              exact
              render={(props) => ( token ? <NewRecordingDevice {...props}  /> : <Redirect to="/login" />)}
            /> 

            <Route 
                path='/edit-account'
                exact 
                render={(props) => (token ? <EditAccount onDelete={this.deleteAccount} id={user.id} username={user.username} {...props} /> : <Redirect to="/login" />)}
              />        

            <Route
            path="/"
            render={props => this.tokenPathCheck(props) ? <Redirect to="/home" /> : null}
            />    
        </Router>
      </div>
    );
  }
}

export default App; 

