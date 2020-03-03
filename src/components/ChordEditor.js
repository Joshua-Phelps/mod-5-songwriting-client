import React, { Fragment, useState, useEffect } from 'react'
import ChordSheetJS from 'chordsheetjs'
import Chord from 'chordjs'
import SaveIcon from '@material-ui/icons/Save';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { api } from '../services/api';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';


function ChordEditor(props){
    const [lyrics, setLyrics] = useState(``)
    const [hideText, setHideText] = useState(false)
    const [saving, setSaving] = useState(false)
    const classes = useStyles();
    
    const handleChange = e => {
        setLyrics(e.target.value)
    }

    const handleHideText = () => {
        setHideText(!hideText)
    }
    
    const getChordMarkup = () => {
        if (lyrics){
            const parser = new ChordSheetJS.ChordProParser()
            const song = parser.parse(lyrics)
            const htmlChordSheet = new ChordSheetJS.HtmlTableFormatter().format(song)
            const textChordSheet = new ChordSheetJS.TextFormatter().format(song)
            return { __html: htmlChordSheet}
        } 
    }

    const handleSave = () => {
        console.log('saving')
        api.songs.editLyrics(props.song.id, lyrics)
        setSaving(true)
        setTimeout(() => {
           setSaving(false)
        }, 1000)
       
    }


    return(
        <Fragment>
            <div>
            {!hideText ? (
                <Fragment>
                    <h3 className={classes.text}>Edit {props.song.title}'s Lyrics</h3>
                    <textarea 
                            style={{width: '90%', height: '150px', color: "#deede7", fontSize: '120%'}}
                            onChange={handleChange} 
                            defaultValue={props.song.lyrics}
                            className={"muiPaper-root"}
                        />
                        <br></br>
                    <Tooltip title="Hide Editor"><ArrowUpwardIcon onClick={handleHideText}  /></Tooltip>
                    {!saving ? <Tooltip title="Hide Editor"><SaveIcon onClick={handleSave} /></Tooltip> : 'Saved!' }
                </Fragment>
                ) : ( 
                <Fragment>
                    <ArrowDownwardIcon onClick={handleHideText}  />
                </Fragment>
                )}
            </div>
            <div className={"muiPaper-root"} >
                <h3 className={classes.text}>{props.song.title} Lyrics</h3>
                <div
                    style={{width: '100%', height: '100%', color: "white", fontFamily: 'monospace', fontSize:'150%', font:'Lucida Console'}}
                    
                    
                    dangerouslySetInnerHTML={getChordMarkup()}
                />                     
            </div>
        </Fragment>
    )
}
export default ChordEditor 

const useStyles = makeStyles({
    text: {
        color: "#deede7"
    }
  });