// import React from 'react'
// import { Grid, Image } from '@material-ui/core'

// export default function Spinner(){
//   return (
//     <Grid container style={{backgroundColor: 'white', height: '100vh'}} >
//       <Grid item sm={4}></Grid>
//       <Grid item xs={12} sm={4}>
//           <img src='https://media.giphy.com/media/PUYgk3wpNk0WA/giphy.gif' />
//           <h1 style={{textAlignLast: 'center'}}>Logging in...</h1>
//       </Grid>
//       <Grid item sm={4}></Grid>
//     </Grid>
//   )
// }

import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
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

export default function Spinner(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={!props.loading}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img src='https://media.giphy.com/media/PUYgk3wpNk0WA/giphy.gif' />
            <h1 style={{textAlignLast: 'center'}}>Logging in...</h1>
            {/* <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p> */}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}