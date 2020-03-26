import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import { 
  makeStyles, 
  Button, 
  AppBar, 
  Toolbar, 
  Typography, 
  Menu, 
  MenuItem 
} from '@material-ui/core'

function NavBar(props){
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()
   

  const handleGoHome = () => {
    setAnchorEl(null)
    props.history.push('/home')
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
          <Button 
          aria-controls="simple-menu" 
          className={classes.menuButton} 
          aria-haspopup="true" 
          onClick={handleClick}
          >
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
            <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default NavBar

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.main
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white'
  },
}))