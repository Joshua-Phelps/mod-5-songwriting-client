import React, { useState, useEffect } from 'react'
import { api } from "../services/api"
import DeleteForm from './DeleteForm'
import EditForm from './EditForm'
import VersionsLibrary from './VersionsLibrary'
import NewRecordingDevice from './NewRecordingDevice'
import LyricHelpers from './LyricHelpers'
import LyricSheet from './LyricSheet'
import { makeStyles, Grid, Paper } from '@material-ui/core';

function SongHome(props){
	const [song, setSong] = useState({
			id: null, 
			title: '', 
			lyrics: '', 
			collection_id: null, 
	})
	const [versions, setVersions ] = useState([])
	const [openEditVersion, setOpenEditVersion] = useState(false)
	const [openDeleteVersion, setOpenDeleteVersion] = useState(false)
	const [selectedVersion, setSelectedVersion] = useState('')
	const [openRecording, setOpenRecording] = useState(false)
	const { id } = props.match.params
	const { onSelectSong } = props
	const selectedSong = props.song
	const classes = useStyles()

	useEffect(() => {        
			api.versions.getSongVersions(id)
			.then(res => res.json())
			.then(data => {
				setSong(data.song)
				setVersions(data.versions)
				if (!selectedSong){
						onSelectSong(data.song)
				}
			})  
	}, [id, onSelectSong, selectedSong])


	const handleOpenRecording = () => {
		setOpenRecording(!openRecording)
	}  

	const handleOpenDeleteVersion = (e, version) => {
		setOpenDeleteVersion(!openDeleteVersion)
		setSelectedVersion(version)
	}

	const handleCloseDeleteVersion = () => {
		setOpenDeleteVersion(false)
		setSelectedVersion('')
	}

	const handleOpenEditVerison = (e, version) => {
		setOpenEditVersion(!openEditVersion)
		setSelectedVersion(version)
	}

	const handleCloseEditVersion = () => {
		setOpenEditVersion(false)
		setSelectedVersion('')
	}

	const addVersion = newVersion => {
		if (newVersion.error) return alert(newVersion.error)
		setVersions([newVersion, ...versions])
	}

	const deleteVersion = (id) => {
		api.versions.deleteVersion(id)
		.then(() => setVersions(prevVersions => prevVersions.filter(v => {
				if (v.id !== id) return v 
				return null
			})
		)) 
	}

	const replaceVersion = (newVersion) => {
		setVersions(prevVersions => prevVersions.map(v => {
			if (v.id === newVersion.id) return newVersion
			return v
		}))
	}

	const editVersion = (title, id) => {
		api.versions.editVersion(id, title)
		.then(version => {
			if (version.error) return alert(version.error)
			replaceVersion(version)
		}).catch(error => console.log(error))
	}

	return(
			<div >
				{openEditVersion && <EditForm 
						input={selectedVersion.title} 
						form='Version' 
						onCloseForm={handleCloseEditVersion} 
						id={selectedVersion.id} 
						onEditInput={editVersion} 
					/>
				}
				
				{openDeleteVersion && <DeleteForm 
						onDelete={deleteVersion} 
						onCloseForm={handleCloseDeleteVersion} 
						id={selectedVersion.id} 
						title={selectedVersion.title}
						message={`This will permenently remove this version`} 
				/>}
						
				<Grid container className={classes.gridContainers} spacing={3}>
						<Grid item xs={12} sm={3}>
							<VersionsLibrary 
							versions={versions} 
							song={song} 
							username={props.username} 
							handleOpenDeleteVersion={handleOpenDeleteVersion} 
							handleOpenEditVerison={handleOpenEditVerison} 
							onOpenRecording={handleOpenRecording} 
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
						{openRecording && 
							<Paper className={classes.recordingContainer}>
								<h3 className={classes.heading}>Record New Verison</h3>
										<div className={classes.recording}>
												<NewRecordingDevice 
												onAddVersion={addVersion} 
												songId={props.match.params.id}
												/>
										</div>
							</Paper>         
						}

						<LyricSheet song={song} openRecording={openRecording} />
						</Grid>
						<Grid item xs={12} sm={3}>                      
							<LyricHelpers />                    
						</Grid>
				</Grid>      
		</div>
	)
}
export default SongHome 

const useStyles = makeStyles(theme => ({
	gridContainers: {
		paddingTop: '2%', 
		paddingLeft: '2%',
		paddingRight: '2%'
	},
	recording: {
		paddingBottom: '10px'
	}, 
	heading: {
		textAlign: 'center',
		color: 'white'
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: 'left',
		height: '100%',
		backgroundColor: theme.palette.primary.main
		},
	text: {
		color: 'white'
	},
	recordingContainer: {
		backgroundColor: theme.palette.primary.main,
		padding: theme.spacing(1),
	}
}))