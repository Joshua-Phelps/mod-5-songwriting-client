import React, { useState } from 'react'
import EditForm from './EditForm'
import DeleteForm from './DeleteForm'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { 
    Button, 
    List, 
    ListItem, 
    ListItemText, 
    Divider, 
    Tooltip, 
    GridList,
    makeStyles 
} from '@material-ui/core'

function CollectionLibrary (props) {
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [collectionName, setCollectionName] = useState('')
    const [collectionId, setCollectionId] = useState('')
    const classes = useStyles()

    const renderCollections = () => {
        return props.collections.map(collection => {
            const {id, collection_name } = collection
            return (
                <div key={collection.id}>
                    <ListItem className={classes.text} >
                        <ListItem button onClick={(e) => handleClick(e, id)}>
                            <ListItemText id={collection.id} primary={`${collection.collection_name}`} />
                        </ListItem> 
                        <Tooltip title="Delete">
                            <DeleteIcon  onClick={(e) => handleOpenDelete(e, collection_name, id)}/>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <EditIcon onClick={(e) => handleOpenEdit(e, collection_name, id)} />
                        </Tooltip>                                              
                    </ListItem>
                    <Divider className={classes.divider} />
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
            {openEdit && 
                <EditForm 
                    input={collectionName} 
                    form='Collection' 
                    onCloseForm={handleCloseEdit} 
                    id={collectionId} 
                    onEditInput={props.onEditCollection} 
                />
            }
            {openDelete && 
                <DeleteForm 
                    onDelete={props.onDeleteCollection} 
                    onCloseForm={handleCloseDelete} 
                    message={'This will remove all songs and versions from this collection'} 
                    id={collectionId} 
                    title={collectionName} 
                />
            }
            <Button 
                className={classes.text}  
                onClick={(e) => handleClick(e, all)}>
                    All Collections
                </Button>
            <GridList className={classes.conatiner}>         
                <List className={classes.list} >
                    {props.collections ? renderCollections(): null}
                </List>
            </GridList>
        </div>
    )
}

export default CollectionLibrary

const useStyles = makeStyles(theme => ({
    list: {
      width: [['100%'], '!important'],
      height: [['60vh'], '!important'],
      backgroundColor: theme.palette.primary.light, 
    },
    divider: {
        backgroundColor: "white",
    },
    container: {
        backgroundColor: theme.palette.primary.dark, 
        width: [['100%'], '!important'],
    },
    text: {
        color: 'white'
    }
  }))