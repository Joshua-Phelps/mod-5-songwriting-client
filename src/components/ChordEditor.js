import React, { Fragment, useState, useEffect } from 'react'
import ChordSheetJS from 'chordsheetjs'
import Chord from 'chordjs'
import SaveIcon from '@material-ui/icons/Save';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { api } from '../services/api';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
// import Paper from '@material-ui/core/Paper';


function ChordEditor(props){
    const [lyrics, setLyrics] = useState('')
    const [hideText, setHideText] = useState(false)
    const [saving, setSaving] = useState(false)
    const classes = useStyles();

    const handleChange = e => {
        setLyrics(e.target.value)
    }

    const handleHideText = () => {
        setHideText(!hideText)
        // api.songs.editLyrics(props.song.id, lyrics)
        // handleSave()
    }
    
    const getChordMarkup = () => {
        if (lyrics !== ''){
            const parser = new ChordSheetJS.ChordProParser()
            const song = parser.parse(lyrics)
            if (song.lines[0].items.length !== 0){
                console.log('yes')
                const htmlChordSheet = new ChordSheetJS.HtmlTableFormatter().format(song)
                return { __html: htmlChordSheet}
            }
            console.log(song.lines[0].items)
            // const textChordSheet = new ChordSheetJS.TextFormatter().format(song)
        } 
    }

    const handleSave = () => {
        api.songs.editLyrics(props.song.id, lyrics)
        setSaving(true)
        setTimeout(() => {
           setSaving(false)
        }, 1000)
       
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(e)
    }

    return(
        <Fragment>
            <div style={{paddingTop: '10px'}}>
            {!hideText ? (
                <Fragment>
                    <h3 className="light-text">Edit {props.song.title}'s Lyrics</h3>
                    <TableContainer style={{overFlow: 'auto'}}>
                    <textarea 
                            style={{width: '90%', height: '150px', color: "#deede7", fontSize: '120%'}}
                            onChange={handleChange} 
                            defaultValue={lyrics ? lyrics : props.song.lyrics}
                            className={"muiPaper-root-darker"}
                        />
                    </TableContainer>
                        <br></br>
                    <Tooltip title="Hide Editor"><ArrowUpwardIcon className="light-text" onClick={handleHideText}  /></Tooltip>
                    {!saving ? <Tooltip title="Save"><SaveIcon className="light-text" onClick={handleSave} /></Tooltip> : <span className="light-text">Saved!</span> }
                </Fragment>
                ) : ( 
                <Fragment>
                    <ArrowDownwardIcon className="light-text" onClick={handleHideText}  />
                </Fragment>
                )}
            </div>
            <div style={{maxWidth: '95%', height: '100%' }} >
                <h3 className="light-text">{props.song.title} Lyrics</h3>
                <TableContainer style={{overFlow: 'auto', overFlowX: 'auto', maxHeight: '50%'}}>
                <div
                    style={{width: '100%', height: '100%', color: "white", fontFamily: 'monospace', fontSize:'150%'}}        
                    dangerouslySetInnerHTML={getChordMarkup()}
                    className={"muiPaper-root-darker"}
                />            
                </TableContainer>         
            </div>
        </Fragment>
    )
}
export default ChordEditor 

const useStyles = makeStyles({
    text: {
        color: "#f2f3f7",
        fontWeight: 'bold'
    }
  });