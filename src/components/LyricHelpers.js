import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    textAlign: 'center'
  },
  form: {
    '& > *': {
        margin: theme.spacing(1),
        width: 200,
        },
    },
}));

export default function LyricHelpers() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
        <form className={classes.form}>
            <TextField id="outlined-basic" label="Search Word" variant="outlined" />
        </form>
        <br></br>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab label="Synomyms" />
        <Tab label="Rhymes" />
        <Tab label="Dictionary" />
      </Tabs>
    </Paper>
  );
}