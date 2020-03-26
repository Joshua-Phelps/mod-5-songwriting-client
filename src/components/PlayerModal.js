import React, { useState } from 'react'
import Player from './Player'
import { 
  makeStyles, 
  Modal, 
  Backdrop, 
  Fade, 
  Grid 
} from '@material-ui/core'

export default function Form(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false)
    props.onClose()
  }


  return (
    <div classsName={classes.paper}>
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
            <h2 className='form-header' id="transition-modal-title">{props.version.title}</h2>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Player recording={props.version.recording} />
                    </Grid>                 
                    <Grid item xs={12}>
                    </Grid>
                </Grid>           
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
      outline: 'none',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '8px solid #004d66',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: 'none',
      width: '35%'
    },
}))
