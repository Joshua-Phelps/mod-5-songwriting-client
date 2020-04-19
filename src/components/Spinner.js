import React from 'react'
import { Grid, Image } from '@material-ui/core'

export default function Spinner(){
  return (
    <Grid container style={{backgroundColor: 'white', height: '100vh'}} >
      <Grid item sm={4}></Grid>
      <Grid item xs={12} sm={4}>
          <img src='https://media.giphy.com/media/PUYgk3wpNk0WA/giphy.gif' />
          <h1 style={{textAlignLast: 'center'}}>Logging in...</h1>
      </Grid>
      <Grid item sm={4}></Grid>
    </Grid>
  )
}