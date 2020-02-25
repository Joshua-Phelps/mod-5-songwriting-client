import React, { Component } from 'react';
import Form from './Form'
import CollectionLibrary from './CollectionLibrary'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { styled } from '@material-ui/core/styles'
import VersionForm from './VersionForm'
import SongForm from'./SongForm'

class Library extends Component {

    constructor(props){
        super(props)
        this.state = {
            collectionId: null,
            songs: [],
            addCollection: false,
            addSong: false
        }
    }

    handleClick = (e) => {
        console.log(e.target.id)
        console.log(e.target.innerText)
        if (e.target.innerText !== 'ALL SONGS'){
            const selectedSongs = this.props.user.songs.filter(song => song.collection_id === parseInt(e.target.id))
            this.setState({
                collectionId: parseInt(e.target.id),
                songs: selectedSongs
            })
        } else {
            this.setState({
                collectionId: null,
                songs: this.props.user.songs
            })
        }
     
    }

    handleOpenSongForm = () => {
        this.setState({ addSong: true })
    }


    renderCollections = () => {
        if (this.props.user.collections){
            return this.props.user.collections.map(collection => {
                return (
                    <div key={collection.id} id={collection.id} onClick={this.handleClick}> 
                      - {collection.collection_name}
                    </div>
                )
            }) 
        }
    }

    handleSongSelect = e => {
        this.props.history.push(`/songs/${e.target.id}`)
    }

    renderSongs = () => {
        if (this.props.songs){
            return this.props.songs.map(song => {
                return (
                    <div key={song.id} id={song.id} onClick={this.handleSongSelect} >
                        - {song.title}
                    </div>
                )
            })
        }
    }

    handleOpenCollectionForm = () => {
        this.setState({ addCollection: true })
      };
    
    handleClose = () => {
        this.setState({open: false})
      };

    handleAddCollection = () => {
        this.props.onAddCollection()
    }

    handleAddSong = () => {

    }
    

    render(){
        return (
            <div >
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper >
                            <Button id='allSongs' name="allSongs" onClick={this.handleClick}>All Songs</Button>
                            <Button type="button" onClick={this.handleOpenCollectionForm}>
                             + New Collection
                            </Button>
                            <Button onClick={this.handleOpenSongForm}>+ New Song</Button>
                                {this.state.addSong? <Form form={'Song'} id={this.state.collectionId} collection={this.props.collections} onAddInput={this.props.onAddSong} /> : null }
                            {this.state.addCollection ? <Form form={'Collection'} collections={false} id={this.props.user.id} onAddInput={this.props.onAddCollection} /> : null }
                            {/* <CollectionLibrary collections={this.props.collections} /> */}
                            {this.renderCollections()}
                        </Paper>
                    </Grid> 
                    <Grid item lg={7}>
                            <Paper >
                                Songs: {this.renderSongs()}
                            </Paper>
                    </Grid> 
                    <Grid item xs={2}>
                            <Button onClick={this.handleOpenSongForm}>+ New Song</Button>
                            {this.state.addSong? <Form form={'Song'} id={this.state.collectionId} collections={this.props.collections} onAddInput={this.props.onAddSong} /> : null }
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default Library