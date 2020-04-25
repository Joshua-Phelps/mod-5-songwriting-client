import React, { useState } from 'react'
import {
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  makeStyles
} from '@material-ui/core'

export default function DeleteForm(props) {
  const [open, setOpen] = useState(true)
  const classes = useStyles()


  const handleClose = () => {
    setOpen(false);
    props.onCloseForm()
  }

  const handleDelete = () => {
    setOpen(false)
    props.onDelete(props.id)
    props.onCloseForm()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          root: classes.root,
          paper: classes.border
        }}
      >
        <DialogTitle className={classes.color}id="alert-dialog-title">
          {`Are you sure you want to delete ${props.title}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
            <br></br>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Go Back
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  border: {
    border: `8px solid ${theme.palette.secondary.main}`
  },
  root: { },
  color: {
    color: theme.palette.secondary.main
  }
}))