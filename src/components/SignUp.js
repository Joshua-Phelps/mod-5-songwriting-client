import React, { useState } from 'react'
import { api } from '../services/api'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { 
  CssBaseline, 
  Paper,
  TextField,
  Link,
  Grid,
  Typography,
  makeStyles,
  Avatar,
  Button
} from '@material-ui/core'


export default function SignUp(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const classes = useStyles()

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== password2) return alert("Your passwords do not match")
    api.auth.signup(username, password).then(res => {
      if (res.password) {
        setPassword('')
        setPassword2('')
        alert(res.password)
      } else if (res.error) {
        setPassword('')
        setPassword2('')
        alert(res.error)
      } else {
        props.history.push('/login')
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className='login-image' />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username.value}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ''))}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={password}
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value.replace(/\s+/g, ''))}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={password2}
                name="password2"
                label="Retype Password"
                type="password"
                id="password2"
                onChange={(e) => setPassword2(e.target.value.replace(/\s+/g, ''))}
                />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login">
              {'Already have an account? Sign in'}
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
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: theme.spacing(8)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
      height: '100vh',
    },
}))