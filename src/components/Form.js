import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

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
    props.form === 'Song' ? props.onAddInput(input, collection) : props.onAddInput(input, props.id)
    setOpen(false);
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
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Create New {props.form}</h2>
            <form onSubmit={handleSubmit}>
            <TextField id="outlined-basic" value={input} label={`${props.form} Title`} onChange={handleChange} variant="outlined" />
            {/* <input onChange={handleChange} value={input} ></input> */}
            {' '}
            <br></br>
            <br></br>
            { props.form === 'Song' ? (
              <div>
                <InputLabel htmlFor='simple-select'>Select Collection</InputLabel>
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
              ) : (
              null
            )}
            <br></br>
            <button type='submit'>Submit</button>
            </form>
        
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
 