import React, { Fragment, useState } from 'react'
import Player from './Player'
import PlayerModal from './PlayerModal'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';


function VerisonsLibrary (props) {
  const classes = useStyles();
  const [selectedVersion, setSelectedVersion] = useState(false)

  const handleSelectVersion = (version) => {
        setSelectedVersion(version)
  }

  const handleClearVersion = () => {
        setSelectedVersion(false)
  }

  const addVersion = newVersion => {
      // if (newVersion.error) return alert(newVersion.error)
      // setVersions([newVersion, ...versions])
  }


    const renderVersions = () => {
        return props.versions.map(version => {
            const { title, id } = version
            const dateStr = new Date(version.created_at).toString()
            const date = dateStr.split('GMT')[0].slice(0, -4)
            return (
                    <TableRow className={classes.paper} key={id}>
                        <TableCell>
                            <Tooltip title={date}>
                                <h4 className={classes.text} onClick={() => handleSelectVersion(version)}>{title}</h4>
                            </Tooltip>
                        </TableCell>
                    
                        <TableCell className={classes.audioTable} component="th" scope="row">
                            <Player recording={version.recording} />
                        </TableCell>
                        <TableCell className={classes.editTable} >
                            <Tooltip title='Delete'>
                                <DeleteIcon className={classes.text}  onClick={(e) => props.handleOpenDeleteVersion(e, version)} />
                            </Tooltip>
                            <Tooltip title='Edit'>
                                <EditIcon className={classes.text}  onClick={(e) => props.handleOpenEditVerison(e, version)} />
                            </Tooltip>             
                        </TableCell>
                    </TableRow>
            )
        })
    }


    return(
        <Fragment>
            {selectedVersion && <PlayerModal onClose={handleClearVersion} version={selectedVersion} />}
            <TableContainer className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell className={classes.text} align='left' ><h3>Title</h3></TableCell>
                        <TableCell align='left' >{props.song.title && <h3 className={classes.text}>Versions</h3> }</TableCell>
                        <TableCell><Button onClick={props.onOpenRecording} className={classes.recordButton}>Record New Version</Button></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.versions && renderVersions()}    
                    </TableBody>
                </Table>
                </TableContainer> 
        </Fragment>
    )
}

export default VerisonsLibrary


const useStyles = makeStyles(theme => ({
    root: {
        maxHeight: 'calc(100vh - 20%)'
    },
    table: {
        width: '100%',
        padding: '10px',
        backgroundColor: theme.palette.primary.dark,
    },
    audioTable: {
      width: '100%', 
      paddingRight: '5px', 
      paddingLeft: '0px'
    },
    editTable: {
      paddingLeft: '5px', 
      paddingRight: '15px', 
      textAlign: 'right',
      color:'grey',
    },
    divider: {
        backgroundColor: "white",
        width: '100%'
    },
    text: {
        color: 'white'
    },
    paper: {
        backgroundColor: theme.palette.primary.light,
      },
    recordButton: {
        color: 'red'
    }
  }));


