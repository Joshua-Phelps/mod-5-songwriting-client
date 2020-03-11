import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function Form(props) {
  const classes = useStyles();
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(true);
  const [collection, setCollection] = useState('')


  const handleClose = () => {
    setOpen(false);
    props.onCloseForm()
  };

  const handleChange = e => {
      setInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!input){
      alert('Please enter a title')
    } else {
      if (props.collections){
        console.log(collection)
        if (!collection){
          alert('You must select a collection')
        } else {
          setOpen(false);
          props.onAddInput(input, collection)
          props.onCloseForm()
        }
      } else {
        props.form === 'Song' ? props.onAddInput(input, collection) : props.onAddInput(input, props.id)
        props.onCloseForm()
      }
    }
  }


  const handleSelect = e => {
    setCollection(e.target.value)
  }

  const renderCollections = () => {
    if (props.collections){
      return props.collections.map(collection => {
        return <MenuItem key={collection.id} value={collection.id}>{collection.collection_name}</MenuItem>
      })
    }
  }



  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        // disableAutoFocus={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 className='form-header' id="transition-modal-title">Create New {props.form}</h2>

                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        variant="filled"
                        required
                        fullWidth
                        id="username"                   
                        label={`Title`}
                        name="title"
                        value={input}
                        onChange={handleChange}
                      />
                    </Grid>
                  
                    <Grid item xs={12}>

                    { props.form === 'Song' ? (
                      <div>
                        <InputLabel htmlFor='simple-select'>Select Collection</InputLabel>
                        <Grid item xs={12}>
                          <br></br>
                        </Grid>
                        <Select
                          labelId="simple-select"
                          id="simple-select"
                          value={collection}
                          style={{width: '100%'}}                   
                          onChange={handleSelect}                
                          >
                          {renderCollections()}
                        </Select>                  
                      </div>
                      ) :  null}
                    </Grid>
                </Grid>
                {props.form === 'Song' ?  <Grid item xs={12}><br></br></Grid> : null }
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  // color="secondary"
                  // classes={{color: classes.button.color}}
                  className={classes.button}
                >
                  Submit
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                  </Grid>
                </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
 
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '8px solid #004d66',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
  button: {
    backgroundColor: '#004d66',
    color: 'white'
  }
}));

// '#376b4c'