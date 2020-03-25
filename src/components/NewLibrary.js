import React, { useState } from 'react'
import CollectionLibrary from './CollectionLibrary'
import SongLibrary from './SongLibrary'
import Form from './Form'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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

  const handleSearch = e => {
    props.onSearch(e.target.value)
  }

  return (
    <div>
      {openSongForm && <Form 
          form='Song' 
          onAddInput={props.onAddSong} 
          collections={props.collections}  
          onCloseForm={handleCloseSongForm} 
        />
      }

      {openCollectionForm && <Form 
          form='Collection' 
          onAddInput={props.onAddCollection} 
          id={props.userId}  
          onCloseForm={handleCloseCollectionForm} 
          />
      }
       <Grid container spacing={3} className={classes.root}>
        <Grid item sm={3}>
            <Paper className={classes.paper} >
              <Button 
                className={classes.text} 
                onClick={handleOpenCollectionForm
                }>
                + New Collection
              </Button>
              <br></br>
              <CollectionLibrary 
                onCollectionSelect={props.onCollectionSelect} 
                collections={props.collections} 
                onEditCollection={props.onEditCollection}
                onDeleteCollection={props.onDeleteCollection}
                />
            </Paper>
        </Grid>
        <Grid item sm={8}>
          <Paper color='primary' className={classes.paper} >
          <Button 
            onClick={handleOpenSongForm} 
            className={classes.text}
            >
            + New Song
          </Button>
          <form className={classes.form} >
            <TextField 
              id="filled-basic"  
              onChange={handleSearch} 
              label="Search Song" 
              variant="filled" 
            />
          </form>
          <br></br>
            <SongLibrary 
              {...props} 
              onEditSong={props.onEditSong} 
              onCloseForm={handleCloseSongForm} 
              collections={props.collections} 
              songs={props.songs} 
              onDeleteSong={props.onDeleteSong}
              onSongSelect={props.onSongSelect}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
export default NewLibrary


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    maxHeight: '100%',
    backgroundColor: theme.palette.primary.main
  },
  form: {
    '& > *': {
        margin: theme.spacing(1),
        width: 200,
        backgroundColor: 'white'
  }},
  text: {
    color: 'white'
  }
}));