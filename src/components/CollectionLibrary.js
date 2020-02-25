import React, { useState } from 'react'
import EditForm from './EditForm'
import DeleteForm from './DeleteForm'
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
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [collectionName, setCollectionName] = useState('')
    const [collectionId, setCollectionId] = useState('')
    const classes = useStyles();

    const renderCollections = () => {
            return props.collections.map(collection => {
                const {id, collection_name } = collection
                return (
                    <ListItem divider key={collection.id}>
                        <ListItem button onClick={(e) => handleClick(e, id)}>
                            <ListItemText id={collection.id} className={classes.text} primary={collection.collection_name} />
                        </ListItem> 
                       
                            <DeleteIcon  onClick={(e) => handleOpenDelete(e, collection_name, id)}/>
                            <EditIcon onClick={(e) => handleOpenEdit(e, collection_name, id)} />
                            {/* <ListItemText  primary='Edit' /> */}
                    
                        <Divider />
                    </ListItem>
                )
            }) 
    }

    const handleOpenEdit = (e, collectionName, collectionId) => {
        setOpenEdit(!openEdit)
        setCollectionName(collectionName)
        setCollectionId(collectionId)
    } 
    
    const handleCloseEdit = () => {
        setOpenEdit(false)
    }


    const handleOpenDelete = (e, collectionName, id) => {
        setOpenDelete(!openDelete)
        setCollectionId(id)
        setCollectionName(collectionName)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleClick = (e, id) => {
        props.onCollectionSelect(id)
    }

    const all = 0

    return(
        <div>
            {(openEdit
            ) ? (
                <EditForm 
                    input={collectionName} 
                    form='Collection' 
                    onCloseForm={handleCloseEdit} 
                    collectionId={collectionId} 
                    onEditInput={props.onEditCollection} 
                />
            ) : (
                null
            )}

            {(openDelete ? <DeleteForm onDelete={props.onDeleteCollection} onCloseForm={handleCloseDelete} collectionId={collectionId} title={collectionName} /> : null)}

            <Button onClick={(e) => handleClick(e, all)}>All Collections</Button>
             <List className={classes.root} >
            {props.collections ? renderCollections(): null}
            </List>
        </div>
    )
}

export default CollectionLibrary