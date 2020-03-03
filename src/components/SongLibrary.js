import React, { useState, Fragment } from 'react'
import EditForm from './EditForm'
import DeleteForm from './DeleteForm'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles(theme => ({
    root: {
      width: '98%',
      maxWidth: '100%',
      backgroundColor: 'rgba(55, 107, 76, 0.7)',
      textAlign: 'center',
      color: 'white',
      height: '100%',
      
    },
    text: {
        paddingLeft: '20px',
        color: 'white'
    },
    button: {
        textAlign: 'right',
        paddingRight: '10px'
    },
    divider: {
        backgroundColor: "#deede7",
        width: '98%'
    },
    divider2: {
        backgroundColor: "#deede7",
        width: '100%'
    }

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
                        <ListItem key={song.id}>
                            <ListItem id={song.id} button onClick={(e) => handleSongSelect(e, song)}>
                                <ListItemText className={'light-text'} primary={song.title} />
                            </ListItem>
                                <Tooltip title="Delete"><DeleteIcon className={'light-text'} onClick={(e) => handleOpenSongDelete(e, id, title)}/></Tooltip>
                                <Tooltip title="Edit"><EditIcon className={'light-text'} onClick={(e) => handleOpenEdit(e, title, collection_id, id)}/></Tooltip>
                        </ListItem>
                        <Divider className={classes.divider2}/>
                    </Fragment>
                )
            })
    }

    const handleSongSelect = (e, song) => {
        // props.onSelectSong(song)
        props.history.push(`/songs/${song.id}`)
    }
   
    return(
        <Fragment>
            <div>
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
            <Divider className={classes.divider} />
            <List className={classes.root} >
                {props.songs ? renderSongs(): null}
            </List>
            </div>
        </Fragment>
    )
}

export default SongLibrary