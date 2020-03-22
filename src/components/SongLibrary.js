import React, { useState, Fragment } from 'react'
import EditForm from './EditForm'
import DeleteForm from './DeleteForm'
import { List, GridList, ListItem, ListItemText, Divider, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    list: {
        width: [['100%'], '!important'],
        height: [['60vh'], '!important'],
    },
    container: {
        backgroundColor: theme.palette.primary.dark, 
        width: [['100%'], '!important'],
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
        backgroundColor: "white",
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
                <Fragment key={song.id}>
                    <ListItem key={song.id}>
                        <ListItem id={song.id} button onClick={(e) => handleSongSelect(e, song)}>
                            <ListItemText primary={song.title} />
                        </ListItem>
                            <Tooltip title="Delete">
                                <DeleteIcon 
                                    onClick={(e) => handleOpenSongDelete(e, id, title)}
                                />
                                </Tooltip>
                            <Tooltip title="Edit">
                                <EditIcon 
                                    onClick={(e) => handleOpenEdit(e, title, collection_id, id)}
                                />
                            </Tooltip>
                    </ListItem>
                    <Divider className={classes.divider}/>
                </Fragment>
            )
        })
    }

    const handleSongSelect = (e, song) => {
        props.history.push(`/songs/${song.id}`)
    }
   
    return(
        <Fragment>
            <div>
            {openEdit && 
                <EditForm 
                    input={title} 
                    form='Song' 
                    collections={props.collections} 
                    onCloseForm={handleCloseEdit} 
                    collection={collectionId} 
                    songId={songId}
                    onEditInput={props.onEditSong} 
                /> 
            }
            {openSongDelete && 
                <DeleteForm 
                    onDelete={props.onDeleteSong} 
                    message={'This will remove all versions of this song'} 
                    onCloseForm={handleCloseSongDelete} 
                    id={songId} 
                    title={title} 
                />
            }
            <Divider className={classes.divider} />
            <GridList className={classes.container} >         
                <List className={classes.list} >
                    {props.songs && renderSongs()}
                </List>
            </GridList>
            </div>
        </Fragment>
    )
}

export default SongLibrary