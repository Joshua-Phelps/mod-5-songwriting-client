import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    text: {
        paddingLeft: '20px'
    },
    button: {
        textAlign: 'right'
    }

  }));

function CollectionLibrary (props) {
    const classes = useStyles();

    const renderCollections = () => {
            return props.collections.map(collection => {
                const id = collection.id
                return (
                    <ListItem divider key={collection.id}>
                        <ListItem button onClick={(e) => handleClick(e, id)}>
                            <ListItemText id={collection.id} className={classes.text} primary={collection.collection_name} />
                        </ListItem> 
                       
                            <DeleteIcon  onClick={handleDelete}/>
                            <EditIcon onClick={handleEdit} />
                            {/* <ListItemText  primary='Edit' /> */}
                    
                        <Divider />
                    </ListItem>
                )
            }) 
    }

    const handleDelete = () => {
        console.log('deleting')
    }

    const handleEdit = () => {
        console.log('editing')
    }


    const handleClick = (e, id) => {
        props.onCollectionSelect(id)
    }

    const all = 0

    return(
        <div>
            <Button onClick={(e) => handleClick(e, all)}>All Collections</Button>
             <List className={classes.root} >
            {props.collections ? renderCollections(): null}
            </List>
        </div>
    )
}

export default CollectionLibrary