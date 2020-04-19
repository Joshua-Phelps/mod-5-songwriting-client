import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import NavBar from './components/NavBar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import SongHome from './components/SongHome'
import NewRecordingDevice from './components/NewRecordingDevice'
import Library from './components/Library'
import EditAccount from './components/EditAccount'
import { api } from "./services/api"


class App extends Component {
  
  INITIAL_STATE = {
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
    search: '',
    loading: false 
  }

  constructor(){
    super()
    this.state = this.INITIAL_STATE
  }


  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      api.auth.getCurrentUser().then(user => {
        if (user.error) return localStorage.removeItem("token")
        const updatedState = { ...this.state.auth, user: user };
        this.setState({ 
          auth: updatedState,
         })
      }).catch(error => console.log(error))
    } 
  }

  login = data => {
    const updatedState = { ...this.state.auth, user: data.user }
    localStorage.setItem("token", data.jwt)
    this.setState({ auth: updatedState, loading: false})
  };

  logout = () => {
    localStorage.removeItem("token")
    this.setState(this.INITIAL_STATE)
  };

  setLoading = boolean => {
    this.setState({loading: boolean})
  }

  addCollection = (collectionName, userId) => {
    api.collections.addCollection(collectionName, userId)
    .then(newCollection => {
      if (newCollection.error) return alert("There was a problem. Please try again")
      this.setState(prevState => ({
        ...prevState, auth: {
          user: {
            ...prevState.auth.user,
            collections: [newCollection, ...prevState.auth.user.collections]
          }
        }
      })) 
    }).catch(error => console.log(error))
  }

  editCollection = (collectionName, collectionId) => {
    api.collections.editCollection(collectionName, collectionId)
    .then(editedCollection => {
      if (editedCollection.error) return alert("There was a problem. Please try again")
      this.setState(prevState => ({
        ...prevState, auth: {
          user: {
            ...prevState.auth.user,
            collections: prevState.auth.user.collections.map(c => {
              if (c.id === editedCollection.id) return editedCollection
              return c
            })
          }
        }
      }))
    }).catch(error => console.log(error))
  }

  deleteCollection = (id) => {
    api.collections.deleteCollection(id)
    .then(() => this.setState(prevState => ({
      ...prevState, auth : {
        user: {
          ...prevState.auth.user,
          collections: prevState.auth.user.collections.filter(c => {
            if (c.id !== id) return c
            return null
          }),
          songs: prevState.auth.user.songs.filter(s => {
            if (s.collection_id !== id) return s
            return null 
          })
        }
      }
    }))).catch(error => console.log(error))
  }

  addSong = (songTitle, collectionId) => {
    api.songs.addSong(songTitle, collectionId)
    .then(song => {
      if (song.error) return alert("There was a problem. Please try again")
      this.setState(prevState => ({
        ...prevState, auth: {
            user: {
              ...prevState.auth.user, 
              songs: [song, ...prevState.auth.user.songs]
            }
          }
      }))
    }).catch((error) => console.log(error))
  }

  editSong = (songTitle, collectionId, songId) => {
    api.songs.editSong(songTitle, collectionId, songId)
    .then(editedSong => {
      if (editedSong.error) return alert("There was a problem. Please try again")
      this.setState(prevState => ({
        ...prevState, auth: {
          user: {
            ...prevState.auth.user,
            songs: prevState.auth.user.songs.map(song => {
              if (song.id === editedSong.id) return editedSong 
              return song 
            })
          }
        }
      }))
    }).catch((error) => console.log(error))
  }

  deleteSong = (songId) => {
    api.songs.deleteSong(songId)
    .then(() => this.setState(prevState => ({
      ...prevState, auth : {
        user: {
          ...prevState.auth.user,
          songs: prevState.auth.user.songs.filter(song => {
            if (song.id === songId) return null
            return song 
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
      if (song.collection_id === selectedCollectionId) return song
      return null 
    })
    const songs = songsByCollection.filter(song => song.title.toLowerCase().includes(this.state.search))


    return (
      <div >
        <Router>
          <Route
          path="/login"
          exact
          render={props => !token ? <Login {...props} setLoading={this.setLoading} onLogin={this.login} /> : <Redirect to="/home" />}
          />

          <Route
          path="/signup"
          exact
          render={props => !token ? <SignUp {...props} /> : <Redirect to="/home" />}
          />                                         
        
          <Route
          path="/"
          render={props => (
            token 
            ? <NavBar {...props} user={user} onLogout={this.logout} onLogin={this.login} /> 
            : props.location.pathname !== "/signup" 
              ? <Redirect to="/login" /> 
              : <Redirect to="/signup" /> 
            )}
          />

          <Route
          path="/home"
          exact
          render={(props) => (
            token 
            ? <Library 
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
            loading={this.state.loading}
            /> 
            : <Redirect to="/login" />
            )}
          />

          <Route
            path="/songs/:id"
            exact
            render={(props) => ( 
              token 
              ? <SongHome 
              onSelectSong={this.selectSong} 
              username={user.username} {...props} /> 
              : <Redirect to="/login" /> 
            )}
          />

          <Route
            path="/recording"
            exact
            render={(props) => ( 
              token 
              ? <NewRecordingDevice {...props}  /> 
              : <Redirect to="/login" />
            )}
          /> 

          <Route 
              path='/edit-account'
              exact 
              render={(props) => (
                token 
                ? <EditAccount 
                onDelete={this.deleteAccount} 
                id={user.id} 
                username={user.username} 
                {...props} /> 
                : <Redirect to="/login" />
              )}
          />        

          <Route
          path="/"
          render={props => this.tokenPathCheck(props) && <Redirect to="/home" />}
          />    
        </Router>
      </div>
    )
  }
}

export default App

