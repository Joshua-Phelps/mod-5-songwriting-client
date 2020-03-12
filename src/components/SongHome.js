import React, { useState, useEffect } from 'react'
import { api } from "../services/api";
import DeleteForm from './DeleteForm'
import EditForm from './EditForm'
import VersionsLibrary from './VersionsLibrary'
import NewRecordingDevice from './NewRecordingDevice'
import LyricHelpers from './LyricHelpers'
import LyricSheet from './LyricSheet'
import Grid from '@material-ui/core/Grid';



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
    const { id } = props.match.params
    const { onSelectSong } = props
    const selectedSong = props.song

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
      }, [id, onSelectSong, selectedSong]);



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
        // .then(version => replaceVersion(version))
    }

    return(
        <div >
            {openEditVersion? <EditForm 
                input={selectedVersion.title} 
                form='Version' 
                onCloseForm={handleCloseEditVersion} 
                id={selectedVersion.id} 
                onEditInput={editVersion} 
            /> : null }
            
            {openDeleteVersion ? <DeleteForm 
                onDelete={deleteVersion} 
                onCloseForm={handleCloseDeleteVersion} 
                id={selectedVersion.id} 
                title={selectedVersion.title}
                message={`This will permenently remove this version`} 
            /> : null}
                
            <Grid container spacing={3}>
                <Grid style={{paddingTop: '2%', paddingLeft: '2%'}} item  xs={3}>
                        <h3 style={{textAlign: 'center'}} className='light-text'>Record New Version</h3>
                        <div style={{paddingBottom: '10px'}}>
                            <NewRecordingDevice 
                                onAddVersion={addVersion} 
                                songId={props.match.params.id}
                            />
                        </div>
                        <VersionsLibrary 
                            versions={versions} 
                            song={song} 
                            username={props.username} 
                            handleOpenDeleteVersion={handleOpenDeleteVersion} 
                            handleOpenEditVerison={handleOpenEditVerison} 
                        />
                </Grid>
                <Grid item xs={6}>
                    <LyricSheet song={song} />
                </Grid>
                <Grid item style={{paddingTop: '2%', paddingRight: '2%'}} xs={3}>                      
                        <LyricHelpers />                    
                </Grid>
            </Grid>      
        </div>
    )
}
export default SongHome 
