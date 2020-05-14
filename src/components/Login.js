import React, { useState } from 'react';
import UnderContruction from './UnderConstruction'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { api } from '../services/api';
import { Link } from "react-router-dom";
import { 
  makeStyles, 
  Avatar, 
  Button, 
  CssBaseline, 
  TextField, 
  Paper, 
  Grid, 
  Typography 
} from '@material-ui/core';


export default function Login(props) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const classes = useStyles()


  const handleSubmit = e => {
    if (error) setError(true)
    e.preventDefault()
    props.setLoading(true)
    api.auth.login({login, password}).then(res => {
      if (!res.error) {
        props.onLogin(res)
        props.history.push('/home');
      } else {
        setError('true')
      }
    })
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className='login-image' />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <UnderContruction /> */}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>         
            <TextField
              helperText={ error ? "Incorrect entry." : null}
              error={error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={login}
              autoFocus
              onChange={(e) => setLogin(e.target.value.replace(/\s+/g, ''))}
            />
            <TextField
              helperText={ error ? "Incorrect entry." : null}
              error={error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value.replace(/\s+/g, ''))}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))