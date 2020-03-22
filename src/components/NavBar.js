import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.secondary.main
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: 'white'
    },
  }));

function NavBar(props){
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
   

  const handleGoHome = () => {
    setAnchorEl(null);
    props.history.push('/home')
  }


  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null)
    props.onLogout()
    props.history.push('/login')
  }

  const handleMyAccount = () => {
    setAnchorEl(null);
    props.history.push('/edit-account')
  }
  return (
    <div className={classes.root}>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.root}>
            Welcome {props.user.username}
          </Typography>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
          </Button>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
          >
            <MenuItem onClick={handleGoHome}>Home</MenuItem>
            <MenuItem onClick={handleMyAccount}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavBar