import React, { useState } from 'react'
import { makeStyles, Modal, Backdrop, Fade } from '@material-ui/core'

export default function SongForm(props) {
  const classes = useStyles()
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(true)

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  const handleChange = e => {
    setInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.onAddSong()
    setOpen(false);
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
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Create New Song</h2>
            <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={input} ></input>
            <button type='submit'>Submit</button>
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
    border: `8px solid ${theme.palette.secondary.main}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
}))