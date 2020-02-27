import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { api } from '../services/api';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    textAlign: 'center',
    paddingLeft: '10px'

  },
  form: {
    '& > *': {
        margin: theme.spacing(1),
        width: 200,
        },
    },
    paperRoot: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
}));

export default function LyricHelpers() {
  const classes = useStyles();
  const [word, setWord] = useState('')
  const [oneSylRhyme, setOneSylRhyme] = useState([])
  const [twoSylRhyme, setTwoSylRhyme] = useState([])
  const [threeSylRhyme, setThreeSylRhyme] = useState([])
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleWordChange = e => {
    setWord(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    api.words.rhymes(word)
    .then(data => setSyllables(data))
  }


  const setSyllables = words => {
    const oneSyl = words.filter(word => word.numSyllables === 1)
    const twoSyl = words.filter(word => word.numSyllables === 2)
    const threeSyl = words.filter(word => word.numSyllables === 3)
    setOneSylRhyme(oneSyl)
    setTwoSylRhyme(twoSyl)
    setThreeSylRhyme(threeSyl)
  }


  const renderRhymes = (words) => {
    if (words){
      return words.map(word => {
        return (
          <Grid item xs={4}>
            <Paper className={classes.paper}>{word.word}</Paper>
          </Grid>
        )
      })
    }
  }

  return (
    <Paper square className={classes.root}>
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="Search Word" onChange={handleWordChange} variant="outlined" />
        </form>
        <br></br>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab label="Synomyms" />
        <Tab label="Rhymes" />
        <Tab label="Dictionary" />
      </Tabs>

      <div className='word-display' >
        {tabValue === 0 ? 'tab0' : null}
        {(tabValue === 1 && oneSylRhyme.length > 0) ? (
          <div className={classes.root}>
          <Grid container spacing={1}>
              <h3 className={classes.root}>One Syllable</h3>
            <Grid container item xs={12} spacing={3}>
              {renderRhymes(oneSylRhyme)}
            </Grid>
            <h3 className={classes.root}>Two Syllables</h3>
            <Grid container item xs={12} spacing={3}>
              {renderRhymes(twoSylRhyme)}
            </Grid>
            <h3 className={classes.root}>Three Syllables</h3>
            <Grid container item xs={12} spacing={3}>
            {renderRhymes(threeSylRhyme)}
            </Grid>
          </Grid>
        </div>
          ) : null}

        {tabValue === 2 ? 'tab2' : null}
      </div>
    </Paper>
  );
}