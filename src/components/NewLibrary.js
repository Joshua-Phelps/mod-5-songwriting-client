import React, { useState } from 'react'
import CollectionLibrary from './CollectionLibrary'
import SongLibrary from './SongLibrary'
import Form from './Form'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useRadioGroup } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    textAlign: 'left',
    padding: '10px',
    color: theme.palette.text.secondary,
  },
  button2: {
    textAlign: 'end',
    padding: '10px',
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
  },
  paperLeft: {
    adding: theme.spacing(2),
    padding: '10px',
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: '40%'
  },
  collectionText: {
    padding: '40px',
    textAlign: 'left',
    color: theme.palette.text.primary,
  }

}));

function NewLibrary(props){
  const classes = useStyles();
  const [openSongForm, setOpenSongForm] = useState(false)
  const [openCollectionForm, setOpenCollectionForm] = useState(false)

  const handleOpenSongForm = () => {
    setOpenSongForm(!openSongForm)
  } 

  const handleCloseSongForm = () => {
    setOpenSongForm(false)
  }

  const handleOpenCollectionForm = () => {
    setOpenCollectionForm(!openCollectionForm)
  } 

  const handleCloseCollectionForm = () => {
    setOpenCollectionForm(false)
  }



  return (
    <div>
      {(openSongForm 
        ) ? (
        <Form 
          form='Song' 
          onAddInput={props.onAddSong} 
          collections={props.collections}  
          onCloseForm={handleCloseSongForm} 
          />
        ) : (
        null 
        )}

      {(openCollectionForm
        ) ? (
        <Form 
          form='Collection' 
          onAddInput={props.onAddCollection} 
          id={props.userId}  
          onCloseForm={handleCloseCollectionForm} 
          />
        ) : (
        null 
        )}

       <Grid container spacing={3} className={classes.root}>
        <Grid item xs={3}>
         
            <Paper>
              <Button onClick={handleOpenCollectionForm} className={classes.button}>+ New Collection</Button><br></br>
                <CollectionLibrary 
                onCollectionSelect={props.onCollectionSelect} 
                collections={props.collections} 
                onEditCollection={props.onEditCollection}
                onDeleteCollection={props.onDeleteCollection}
                />
            </Paper>

        </Grid>
        <Grid item xs={8}>
          <Paper >
          <Button onClick={handleOpenSongForm} className={classes.button2}>+ Add Song</Button><br></br>
            <SongLibrary 
            {...props} 
            onEditSong={props.onEditSong} 
            onCloseForm={handleCloseSongForm} 
            collections={props.collections} 
            songs={props.songs} 
            onDeleteSong={props.onDeleteSong}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
export default NewLibrary