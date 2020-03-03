import React, { useState } from 'react'
import CollectionLibrary from './CollectionLibrary'
import SongLibrary from './SongLibrary'
import Form from './Form'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


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
          <Paper className={"muiPaper-root"} >
          <Button onClick={handleOpenSongForm} className={classes.button2}>+ New Song</Button><br></br>
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
    // opacity: 0.6,
    // color: 'white'
  },
  list: {
    opacity: 0.8,
    backgroundColor: '#00004d'
  },
  button: {
    textAlign: 'left',
    padding: '10px',
    color: "#deede7"
    // color: theme.palette.text.secondary,
  },
  button2: {
    textAlign: 'end',
    padding: '10px',
    color: "#deede7"
    // color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    height: '100%'
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    // backgroundImage: 'url(https://images.unsplash.com/photo-1550291652-6ea9114a47b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80)',
    backgroundImage: 'url(https://images.pexels.com/photos/15919/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paperLeft: {
    adding: theme.spacing(2),
    padding: '10px',
    textAlign: 'left',
    // color: theme.palette.text.secondary,
    height: '40%'
  },
  collectionText: {
    padding: '40px',
    textAlign: 'left',
    // color: theme.palette.text.primary,
  }

}));