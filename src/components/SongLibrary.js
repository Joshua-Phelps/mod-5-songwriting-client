import React, { useState, Fragment } from 'react'
import EditForm from './EditForm'
import DeleteForm from './DeleteForm'
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
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '100%'
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
    const [openEdit, setOpenEdit] = useState(false)
    const [openSongDelete, setOpenSongDelete] = useState(false)
    const [title, setTitle] = useState('')
    const [collectionId, setCollectionId] = useState('')
    const [songId, setSongId] = useState('')
    const classes = useStyles();

    const handleOpenEdit = (e, title, collectionId, songId) => {
        setOpenEdit(!openEdit)
        setTitle(title)
        setCollectionId(collectionId)
        setSongId(songId)
    } 
    
    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    const handleOpenSongDelete = (e, songId, title) => {
        setOpenSongDelete(!openSongDelete)
        setSongId(songId)
        setTitle(title)
    }

    const handleCloseSongDelete = () => {
        setOpenSongDelete(false)
    }
    

    const renderSongs = () => {
            return props.songs.map(song => {
                const {id, title, collection_id } = song
                
                return (
                    <Fragment>
                        <ListItem divider key={song.id}>
                            <ListItem id={song.id} button onClick={(e) => handleSongSelect(e, id)}>
                                <ListItemText className={classes.text} primary={song.title} />
                            </ListItem>
                            <DeleteIcon onClick={(e) => handleOpenSongDelete(e, id, title)}/>
                                <EditIcon onClick={(e) => handleOpenEdit(e, title, collection_id, id)}/>
                            <Divider />
                        </ListItem>
                    </Fragment>
                )
            })
    }

    const handleSongSelect = (e, id) => {
        props.history.push(`/songs/${id}`)
    }
   
    return(
        <Fragment>
            {(openEdit
            ) ? (
                <EditForm 
                    input={title} 
                    form='Song' 
                    collections={props.collections} 
                    onCloseForm={handleCloseEdit} 
                    collection={collectionId} 
                    songId={songId}
                    onEditInput={props.onEditSong} 
                />
            ) : (
                null
            )}
            {(openSongDelete ? <DeleteForm onDelete={props.onDeleteSong} message={'This will remove all versions of this song'} onCloseForm={handleCloseSongDelete} id={songId} title={title} /> : null)}
            <List className={classes.root} >
                {props.songs ? renderSongs(): null}
            </List>
        </Fragment>
    )
}

export default SongLibrary