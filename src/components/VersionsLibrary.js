import React, { Fragment, useState } from 'react'
import Player from './Player'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    width: '100%'
  },
});



function VerisonsLibrary (props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClose = () => {
        setAnchorEl(null);
      };
 
    const handleClick = e => {
        setAnchorEl(e.currentTarget)
    }

    const renderVersions = () => {
        return props.versions.map(version => {
            const { title, id } = version
            const display = `${title}`
            console.log(version)
            return (
                <Fragment>
                        <TableCell style={{paddingRight: '5px'}} align="left"><h4>{title}</h4></TableCell>
                        <TableCell style={{width: '100%', paddingRight: '5px', paddingLeft: '0px'}} component="th" scope="row">
                            <Player recording={version.recording} />
                        </TableCell>
                        <TableCell style={{paddingLeft: '0px', paddingRight: '5px', color:'grey'}} size='small' align="right">
                        <DeleteIcon onClick={(e) => props.handleOpenDeleteVersion(e, version)} /><EditIcon onClick={(e) => props.handleOpenEditVerison(e, version)} />                
                        </TableCell>
                    <TableRow key={id}>
                    </TableRow>
                </Fragment>
            )
        })
    }

    return(
        <Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align='left' ><h3>Title</h3></TableCell>
                        <TableCell align='left' >{props.song.title ? <h3>Versions</h3> : null }</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.versions ?renderVersions() : null}    
                    </TableBody>
                </Table>
                </TableContainer> 
        </Fragment>
    )
}

export default VerisonsLibrary


