import React from 'react'
import CollectionLibrary from './CollectionLibrary'
import SongLibrary from './SongLibrary'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    textAlign: 'left',
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
  return (
    <div>
       <Grid container spacing={3} className={classes.root}>
        <Grid item xs={3}>
         
            <Paper>
              <Button className={classes.button}>+ New Collection</Button><br></br>
                <CollectionLibrary onCollectionSelect={props.onCollectionSelect} collections={props.collections} />
            </Paper>

        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <SongLibrary songs={props.songs} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
export default NewLibrary