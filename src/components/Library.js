import React, { Component } from 'react';
import CollectionForm from './CollectionForm'
import CollectionLibrary from './CollectionLibrary'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

class Library extends Component {

    constructor(){
        super()
        this.state = {
            user: null,
            collectionId: null,
            songs: [],
            open: false 
        }
    }

    componentDidMount(){
            this.setState({
                songs: this.props.songs
            })
    }


    handleClick = (e) => {
        if (e.target.id !== 'allSongs'){
            const selectedSongs = this.props.user.songs.filter(song => song.collection_id === parseInt(e.target.id))
            this.setState({
                collectionId: parseInt(e.target.id),
                songs: selectedSongs
            })
        } else {
            console.log("hi")
            this.setState({
                collectionId: null,
                songs: this.props.user.songs
            })
        }
     
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
        return this.state.songs.map(song => {
            return (
                <div key={song.id} id={song.id} onClick={this.handleSongSelect} >
                    - {song.title}
                </div>
            )
        })
    }

    handleAddCollection = () => {
        this.props.onAddCollection()
    }

    handleOpen = () => {
        this.setState({ open: true })
      };
    
    handleClose = () => {
        this.setState({open: false})
      };



    render(){
        return (
            <div >
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper >
                            <div id='allSongs' onClick={this.handleClick}>
                            <Button>All Songs</Button>
                            </div>
                            <Button type="button" onClick={this.handleOpen}>
                             + New Collection
                            </Button>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={this.state.open}
                                onClose={this.handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                timeout: 500,
                                }}
                            >
                            <Fade in={this.state.open}>
                            <div >
                                <CollectionForm user={this.props.user} onAddCollection={this.props.onAddCollection} />
                                <h2 id="transition-modal-title"></h2>
                                <p id="transition-modal-description">react-transition-group animates me.</p>
                            </div>
                            </Fade>
                            </Modal>
                            {/* <CollectionLibrary collections={this.props.collections} /> */}
                            {this.renderCollections()}
                        </Paper>
                    </Grid> 
                    <Grid item lg={9}>
                        <Paper >{this.state.songs ? this.renderSongs() : null }</Paper>
                    </Grid> 
                    
                    {/* <Typography component="div" style={{ backgroundColor: '#e0f7fa', height: '100vh' }} /> */}
                
                </Grid>
            </div>
        )
    }
}
export default Library