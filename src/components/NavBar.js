import React from 'react';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

function NavBar(props){
    const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: '#2196f3'}} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Library
          </Typography>
          <Button color="inherit">{props.user.username}</Button>
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavBar