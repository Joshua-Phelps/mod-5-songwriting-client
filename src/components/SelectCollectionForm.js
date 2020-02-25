import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function SelectCollectionForm (props) {
    const classes = useStyles();
    const [collection, setCollection] = useState('');

    const handleChange = event => {
        setCollection(event.target.value);
      };

    const renderCollections = () => {
        return props.collections.map(collection => {
            return <MenuItem value={collection.id}>collection.title</MenuItem>
        })
    } 

    return (
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Collection</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={collection}
          onChange={handleChange}
        >
          {props.collections ? renderCollections() : null }
        </Select>
      </FormControl>
    )
}

export default SelectCollectionForm 
