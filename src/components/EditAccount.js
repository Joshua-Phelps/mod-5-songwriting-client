import React, { useState } from 'react'
import DeleteForm from './DeleteForm'
import DeleteIcon from '@material-ui/icons/Delete'
import { 
    makeStyles, 
    Typography, 
    CssBaseline, 
    Container, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText 
} from '@material-ui/core'


function EditAccount(props) {
    const [openDelete, setOpenDelete] = useState(false)
    const classes = useStyles()

    const handleDelete = () => {
        setOpenDelete(!openDelete)
    }


    return (
        <div>
            {openDelete && <DeleteForm 
                onDelete={props.onDelete} 
                message={'This will permenently delete your account'} 
                onCloseForm={handleDelete} 
                id={props.id} 
                title={`${props.username}'s account`} />
            }
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography className='form-header' component="h1" variant="h5">
                        Edit Account
                    </Typography>
                        <div className={classes.root}>
                            <List className={classes.list} component='nav'>                                                      
                                <ListItem button onClick={handleDelete}>
                                    <ListItemIcon>
                                        <DeleteIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Delete Account" />
                                </ListItem>                               
                            </List>
                        </div>                    
                </div>
            </Container>
        </div>
    )
}
export default EditAccount

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(15),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.background.paper,
      border: '8px solid #004d66',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: 'none',
    },
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    list: {
        paddingTop: '10%'
    }
  }));