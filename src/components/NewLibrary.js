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
      {openSongForm ? <Form 
          form='Song' 
          onAddInput={props.onAddSong} 
          collections={props.collections}  
          onCloseForm={handleCloseSongForm} 
          /> : null }

      {openCollectionForm ? <Form 
          form='Collection' 
          onAddInput={props.onAddCollection} 
          id={props.userId}  
          onCloseForm={handleCloseCollectionForm} 
          /> : null}

       <Grid container spacing={3} className={classes.root}>
        <Grid item xs={3}>
            <Paper className={"muiPaper-root"} >
              <Button className={classes.button} onClick={handleOpenCollectionForm}>+ New Collection</Button><br></br>
                <CollectionLibrary 
                onCollectionSelect={props.onCollectionSelect} 
                collections={props.collections} 
                onEditCollection={props.onEditCollection}
                onDeleteCollection={props.onDeleteCollection}
                />
            </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper style={{maxHeight: '100%'}} className={"muiPaper-root"} >
          <Button onClick={handleOpenSongForm} className={classes.button2}>+ New Song</Button>
          <form className={classes.form} >
            <TextField id="filled-basic" style={{borderColor: 'white'}} onChange={handleSearch} label="Search Song" variant="filled" />
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
  list: {
    opacity: 0.8,
    backgroundColor: '#00004d'
  },
  button: {
    textAlign: 'left',
    padding: '10px',
    color: "#deede7"
  },
  button2: {
    textAlign: 'end',
    padding: '10px',
    color: "#deede7"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: '100%'
  },
  paperLeft: {
    adding: theme.spacing(2),
    padding: '10px',
    textAlign: 'left',
    height: '40%'
  },
  collectionText: {
    padding: '40px',
    textAlign: 'left',
  },
  search: {
    color: 'white'
  },
  form: {
    '& > *': {
        margin: theme.spacing(1),
        width: 200,
        backgroundColor: '#f2f3f7',
  }}
}));