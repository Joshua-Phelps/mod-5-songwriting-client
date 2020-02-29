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
    paper2: {
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
    synonyms: {
      textAlign: 'left',
      color: theme.palette.text.primary
    }
}));

export default function LyricHelpers() {
  const classes = useStyles();
  const [word, setWord] = useState('')
  const [rhymes, setRhymes] = useState([])
  const [definitions, setDefinitions] = useState([])
  const [synonyms, setSynonyms] = useState([])
  const [tabValue, setTabValue] = useState(0);
  const oneSyl = rhymes.filter(word => word.numSyllables === 1)
  const twoSyl = rhymes.filter(word => word.numSyllables === 2)
  const threeSyl = rhymes.filter(word => word.numSyllables === 3)
  const adjectives = definitions.filter(def => def.partOfSpeech === 'adjective')
  const nouns = definitions.filter(def => def.partOfSpeech === 'noun')
  const verbs = definitions.filter(def => def.partOfSpeech === 'verb')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleWordChange = e => {
    setWord(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    api.words.rhymes(word).then(data => setRhymes(data))
    api.words.synonyms(word).then(data => setSynonyms(data.synonyms))
    api.words.dictionary(word).then(data => setDefinitions(data.definitions))
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

  const renderSynonyms = () => {
    return synonyms.map(syn => {
      return (
        <Grid item xs={4}>
          <Paper className={classes.paper}>{syn}</Paper>

          {/* <p className={classes.synonyms} > - {syn}</p> */}
        </Grid>
      )
    })
  }


  const renderDefinitions = (definitions) => {
    return definitions.map(def => {
      return (
        <Grid item xs={12}>
          <Paper className={classes.paper2} > - {def.definition}</Paper>
        </Grid>
      )
    })
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
        {tabValue === 0 ? (
          <div className={classes.root}>
            <h2></h2>
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
                {renderSynonyms()}
              </Grid>
            </Grid>
          </div>
          ) : null}

        {(tabValue === 1) ? (
          <div className={classes.root}>
          <Grid container spacing={1}>
              {oneSyl.length > 0 ? <h3 className={classes.root}>One Syllable</h3> : ''}
            <Grid container item xs={12} spacing={3}>
              {renderRhymes(oneSyl)}
            </Grid>
            {twoSyl.length > 0 ? <h3 className={classes.root}>Two Syllables</h3> : ''}
            <Grid container item xs={12} spacing={3}>
              {renderRhymes(twoSyl)}
            </Grid>
            {threeSyl.length > 0 ? <h3 className={classes.root}>Three Syllables</h3> : ''}
            <Grid container item xs={12} spacing={3}>
            {renderRhymes(threeSyl)}
            </Grid>
          </Grid>
        </div>
          ) : null}

        {tabValue === 2 ? (
          <div className={classes.root}>
            <Grid container spacing={1}>
              {nouns.length > 0 ? <h3 className={classes.root}>As Noun</h3> : ''}
              <Grid container item xs={12}>
                {renderDefinitions(nouns)}
              </Grid>
              {verbs.length > 0 ? <h3 className={classes.root}>As Verb</h3> : ''}
              <Grid container item xs={12}>
                {renderDefinitions(verbs)}
              </Grid>
              {adjectives.length > 0 ? <h3 className={classes.root}>As Adjective</h3> : ''}
              <Grid container item xs={12}>
                {renderDefinitions(adjectives)}
              </Grid>
            </Grid>
          </div>
          ) : null}
      </div>
    </Paper>
  );
}