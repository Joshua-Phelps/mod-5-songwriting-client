import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { api } from '../services/api';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


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
      return words.map((word, idx) => {
        return (
          <GridListTile key={idx} >
            <Paper className={classes.paper}>{word.word}</Paper>
          </GridListTile>
        )
      })
    }
  }

  const renderSynonyms = () => {
    return synonyms.map((syn, idx) => {
      return (
        <GridListTile key={idx} >
          <Paper className={classes.paper}>{syn}</Paper>
        </GridListTile>
      )
    })
  }

  const renderDefinitions = (definitions) => {
    return definitions.map((def, idx) => {
      return (
        <Grid key={idx} style={{paddingTop: '10px'}} item xs={12}>
          <Paper style={{width: '90%'}} className={classes.paper2} > - {def.definition}</Paper>
        </Grid>
      )
    })
  }

  return (
    <Paper square className={classes.root}>
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField id="filled-basic" className={classes.text} label="Search Word" onChange={handleWordChange} variant="filled" />
        </form>
        <br></br>
      <TableContainer component={Paper} >
      <Tabs
        value={tabValue}
        className={'light-text'}
        onChange={handleTabChange}
        variant="scrollable"       
        classes={{
          indicator: classes.indicator
        }}
        scrollButtons="auto"
        aria-label="icon label tabs example"
      >
        <Tab label="Synomyms" />
        <Tab label="Rhymes" />
        <Tab label="Dictionary" />
      </Tabs>
      </TableContainer>
   
      {tabValue === 0 && (
        <div className={classes.root2}>
          <GridList cols={3} cellHeight={'auto'} className={classes.gridList}>
            {renderSynonyms()}
          </GridList>
        </div>        
      )}

      {tabValue === 1 && (
        <div className={classes.root2}>
          <GridList cols={3} cellHeight={'auto'} className={classes.gridList}>
            {oneSyl.length > 0 ? <h3 className={classes.root}>One Syllable</h3> : ''}
            <GridList cols={3} cellHeight={'auto'} className={classes.gridList}>
              {renderRhymes(oneSyl)}  
            </GridList>
            {twoSyl.length > 0 ? <h3 className={classes.root}>Two Syllables</h3> : ''}
            <GridList cols={3} cellHeight={'auto'} className={classes.gridList}>
              {renderRhymes(twoSyl)}
            </GridList>
            {threeSyl.length > 0 ? <h3 className={classes.root}>Three Syllables</h3> : ''}
            <GridList cols={3} cellHeight={'auto'} className={classes.gridList}>
              {renderRhymes(threeSyl)} 
            </GridList>
          </GridList>
        </div>
      )}

      {tabValue === 2 && (
        <div className={classes.root2}>
          <GridList cols={1} cellHeight={'auto'} className={classes.gridList}>
            {nouns.length > 0 ? <h3 className={classes.root}>Noun</h3> : ''}
            {renderDefinitions(nouns)}             
            {verbs.length > 0 ? <h3 className={classes.root}>Verb</h3> : ''}              
            {renderDefinitions(verbs)}              
            {adjectives.length > 0 ? <h3 className={classes.root}>Adjective</h3> : ''}              
            {renderDefinitions(adjectives)}          
          </GridList>
        </div> 
      )}
    </Paper>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    textAlign: 'center',
    padding: '2%',
    backgroundColor: theme.palette.primary.dark,
    maxHeight: 'calc(100vh - 20%)'
  },
  form: {
    '& > *': {
        margin: theme.spacing(1),
        backgroundColor: 'white'
        },
  },
  paper: {
    padding: theme.spacing(1),
    paddingTop: '5px',
    textAlign: 'center',
    height: '100%'
  },
  paper2: {
    padding: theme.spacing(1),
    textAlign: 'left',
  },
  indicator: {
    backgroundColor: 'white',
  },
  gridList: {
    width: '100%',
    maxHeight: '59vh'
  },
  root2: {
    display: 'flex',
    overflow: 'hidden',
    // maxHeight: 'calc(100vh - 20%)'
  },
  text: {
    borderColor: 'white'
  }
}));