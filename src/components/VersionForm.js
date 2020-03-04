import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';



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
  },
  button: {
    backgroundColor: '#004d66',
    color: 'white'
  }

}));

export default function VersionForm(props) {
  const classes = useStyles();
  const [input, setInput] = React.useState('')
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => {
      setInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.onSave(input)
    setOpen(false);
  }

  return (
    <div>
      <SaveIcon className='light-text' onClick={handleOpen} />
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
            <h2 className='form-header' id="transition-modal-title">Create New Version</h2>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
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
                </Grid>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Submit
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                  </Grid>
                </Grid>
                </Grid>
            </form> 
          </div>
        </Fade>
      </Modal>
    </div>
  );
}