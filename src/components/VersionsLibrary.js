import React, { Fragment, useState } from 'react'
import Player from './Player'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';


function VerisonsLibrary (props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);



    const handleClose = () => {
        setAnchorEl(null);
      };
 
    const handleClick = e => {
        setAnchorEl(e.currentTarget)
    }

   

    const renderVersions = () => {
        return props.versions.map(version => {
            const { title, id } = version
            const dateStr = new Date(version.created_at).toString()
            const date = dateStr.split('GMT')[0].slice(0, -4)
        
            return (
                <Fragment>
                        {/* <TableCell style={{paddingRight: '5px'}} align="left"> */}
                        <TableCell >
                        <Tooltip title={date}><h4>{title}</h4></Tooltip>
                        </TableCell>
                        {/* <TableCell style={{width: '100%', paddingRight: '5px', paddingLeft: '0px'}} component="th" scope="row"> */}

                        <TableCell className={classes.audioTable} component="th" scope="row">
                            <Player recording={version.recording} />
                        </TableCell>
                        <TableCell className={classes.editTable} >
                            <Tooltip title='Delete'><DeleteIcon onClick={(e) => props.handleOpenDeleteVersion(e, version)} /></Tooltip>
                            <Tooltip title='Edit'><EditIcon onClick={(e) => props.handleOpenEditVerison(e, version)} /></Tooltip>             
                        </TableCell>
                    <TableRow key={id}>
                    </TableRow>
                </Fragment>
            )
        })
    }


    return(
        <Fragment>
            <TableContainer className={"muiPaper-root"} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align='left' ><h3>Title</h3></TableCell>
                        <TableCell align='left' >{props.song.title ? <h3>Versions</h3> : null }</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.versions ? renderVersions() : null}    
                    </TableBody>
                </Table>
                </TableContainer> 
        </Fragment>
    )
}

export default VerisonsLibrary


const useStyles = makeStyles({
    table: {
      width: '100%',
    },
    audioTable: {
      width: '100%', 
      paddingRight: '5px', 
      paddingLeft: '0px'
    },
    editTable: {
      paddingLeft: '0px', 
      paddingRight: '5px', 
      color:'grey',
      // size: 'small', 
      // align: "right",
    }
  });


