import React, { useState, useEffect, Fragment } from 'react'
import { api } from "../services/api";
import NewRecordingDevice from './NewRecordingDevice'
import RecordingDevice from './RecordingDevice'
import Player from './Player'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      padding: '10px',
      backgroundColor: theme.palette.background.paper,
    //   maxHeight: 700,
      overflow: 'auto'
     
    },
  }));

function SongHome(props){
    const [versions, setVersions] = useState([])
    const classes = useStyles();

    useEffect(() => {
        fetchVersions()
      }, []);

    const fetchVersions = () => {
        api.versions.getSongVersions(props.match.params.id)
        .then(res => res.json())
        .then(data => setVersions(data))
    }

    const renderVersions = () => {
        return versions.map(version => {
            const { title, id } = version
            const display = `Version: ${title}`
            return (
                <Fragment>
                    <ListItemText primary={display} /><br></br>
                    <ListItem key={id} divider >
                        {/* <ListItemText primary={title} /><br></br> */}
                        <ListItemText primary={<Player recording={version.recording} />} />
                    </ListItem>
                </Fragment>

            )
        })
    }

    const addVersion = versions => {
        setVersions(versions)
        renderVersions()
    }

    return(
       
        <Grid className={classes.root}>
            <Grid xs={12}>
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    <ListItem divider>
                        <ListItemText primary={<NewRecordingDevice onAddVersion={addVersion} songId={props.match.params.id}/>} />
                    </ListItem>
                    {renderVersions()}
                </List>
            </Grid>
        </Grid>
        
    )
}
export default SongHome 


// import React, { Component } from 'react'
// import { api } from "../services/api";
// import NewRecordingDevice from './NewRecordingDevice'
// import RecordingDevice from './RecordingDevice'
// import Player from './Player'

// class SongHome extends Component {

//     constructor(){
//         super()
//         this.state = {
//             versions: []
//         }
//     }

//     componentDidMount(){
//         this.fetchVersions()
//     }


//     fetchVersions = () => {
//         api.versions.getSongVersions(this.props.match.params.id)
//         .then(res => res.json())
//         .then(data => this.setState({ versions: data }))
//     }

//     addVersion = version => {
//         this.setState(prevState => ({ versions: [...prevState.versions, version]}))
//         this.renderVersions()
//     }

//     renderVersions = () => {
//         return this.state.versions.map(version => {
//             return (
//                 <div key={version.id} > {version.title} <Player recording={version.recording} /> </div>
//             )
//         })
//     }


//     render(){
//         return (
//             <div>
//                 <RecordingDevice onAddVersion={this.addVersion} songId={this.props.match.params.id}/>
//                 {this.renderVersions()}
//             </div>
//         )
//     }

// }

// export default SongHome 

// function SongHome(props){
//     const [versions, setVersions] = useState(false)
//     return(
//         null 
//     )
// }