import React, { useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    text: {
        paddingLeft: '20px'
    },
    button: {
        textAlign: 'right',
        paddingRight: '10px'
    },

  }));

function SongLibrary (props) {
    const classes = useStyles();

    const renderSongs = () => {
            return props.songs.map(song => {
                return (
                    <ListItem divider key={song.id} id={song.id}>
                        <ListItem button onClick={handleShowSong}>
                            <ListItemText className={classes.text} primary={song.title} />
                        </ListItem>
                        <DeleteIcon onClick={handleDelete}/>
                            <EditIcon onClick={handleEdit}/>
                        <Divider />
                    </ListItem>
                )
            })
    }

    const handleShowSong = () => {
        console.log('ok')
    }

    const handleDelete = () => {
        console.log('deleting')
    }

    const handleEdit = () => {
        console.log('editing')
    }

    return(
        <List className={classes.root} >
            {props.songs ? renderSongs(): null}
        </List>
    )
}

export default SongLibrary