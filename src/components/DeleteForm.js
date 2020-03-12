import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

export default function DeleteForm(props) {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();


  const handleClose = () => {
    setOpen(false);
    props.onCloseForm()
  };

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
  );
}

const useStyles = makeStyles(theme => ({
  border: {
    border: '8px solid #004d66',
  },
  root: { },
  color: {
    color: '#004d66'
  }
}));