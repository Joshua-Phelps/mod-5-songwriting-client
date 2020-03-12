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
import Tooltip from '@material-ui/core/Tooltip';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';


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
                    <div key={collection.id}>
                        <ListItem >
                            <ListItem button onClick={(e) => handleClick(e, id)}>
                                <ListItemText id={collection.id} className={classes.text} primary={`${collection.collection_name}`} />
                            </ListItem> 
                            <Tooltip title="Delete">
                                <DeleteIcon  onClick={(e) => handleOpenDelete(e, collection_name, id)}/>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <EditIcon onClick={(e) => handleOpenEdit(e, collection_name, id)} />
                            </Tooltip>                                              
                        </ListItem>
                        <Divider classes={{root: classes.divider}} />
                    </div>
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
            {openEdit? <EditForm 
                    input={collectionName} 
                    form='Collection' 
                    onCloseForm={handleCloseEdit} 
                    id={collectionId} 
                    onEditInput={props.onEditCollection} 
                /> : null }

            {openDelete ? <DeleteForm 
                    onDelete={props.onDeleteCollection} 
                    onCloseForm={handleCloseDelete} 
                    message={'This will remove all songs and versions from this collection'} 
                    id={collectionId} 
                    title={collectionName} 
                /> : null}

            <Button className={classes.button}  onClick={(e) => handleClick(e, all)}>All Collections</Button>
            <Divider classes={{root: classes.divider}} />
            <TableContainer style={{ maxHeight: '500px', overFlow: 'auto'}} className={"muiPaper-root-darker"} component={Paper}>         
                <List className={classes.root} >
                    {props.collections ? renderCollections(): null}
                </List>
            </TableContainer>
        </div>
    )
}

export default CollectionLibrary

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: '100%',
      backgroundColor: 'rgba(55, 107, 76, 0.7)',
      color: "#f2f3f7"
    },
    text: {
        paddingLeft: '20px',
        color: "#f2f3f7"
    },
    button: {
        textAlign: 'right',
        color: "#f2f3f7"
    },
    divider: {
        backgroundColor: "#f2f3f7",
        borderBottom: 'solid 1px white'
    }
  }));