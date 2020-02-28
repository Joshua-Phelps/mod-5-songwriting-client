import React, { Fragment } from 'react'
import Player from './Player'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function VerisonsLibrary (props) {

    const renderVersions = () => {
        return props.versions.map(version => {
            const { title, id } = version
            const display = `${title}`
            return (
                <Fragment>
                    <ListItemText primary={display} /><br></br>
                        <DeleteIcon onClick={(e) => props.handleOpenDeleteVersion(e, version)} /><EditIcon onClick={(e) => props.handleOpenEditVerison(e, version)} />
                    <ListItem key={id} divider >
                        <ListItemText primary={<Player recording={version.recording} />} />
                    </ListItem>
                </Fragment>

            )
        })
    }

    return(
        <Fragment>
            {props.versions ?renderVersions() : null}
        </Fragment>
    )
}

export default VerisonsLibrary