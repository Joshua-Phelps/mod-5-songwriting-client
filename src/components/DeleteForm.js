import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteForm(props) {
  const [open, setOpen] = React.useState(true);


  const handleClose = () => {
    setOpen(false);
    props.onCloseForm()
  };

  const handleDelete = () => {
    setOpen(false)
    props.songId ? props.onDelete(props.songId) : props.onDelete(props.collectionId)
    console.log('deleting')
    props.onCloseForm()
  }


  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.songId ? 'This will remove all versions of this song' : "This will remove all songs and versions from this collection"}
            <br></br>
            Are you sure you want to delete '{props.title}'?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Go Back
          </Button>
          <Button onClick={handleDelete} color="red" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}