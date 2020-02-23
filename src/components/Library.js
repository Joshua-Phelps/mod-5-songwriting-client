import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


class Library extends Component {

    constructor(){
        super()
        this.state = {
            user: null,
            collectionId: null,
            songs: []
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
        console.log(e.target.id)
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


    render(){
        return (
            <div >
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper >
                            <div id='allSongs' onClick={this.handleClick}>
                            All Collections 
                            </div>
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