import React, { useState } from 'react'
import { makeStyles, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'


function SelectCollectionForm (props) {
  const classes = useStyles();
  const [collection, setCollection] = useState('');

  const handleChange = event => {
      setCollection(event.target.value);
    }

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

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))
