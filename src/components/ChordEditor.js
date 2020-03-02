import React, { Fragment, useState, useEffect } from 'react'
import ChordSheetJS from 'chordsheetjs'
import SaveIcon from '@material-ui/icons/Save';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { api } from '../services/api';
import Tooltip from '@material-ui/core/Tooltip';


function ChordEditor(props){
    const [lyrics, setLyrics] = useState(``)
    const [hideText, setHideText] = useState(false)
    const [saving, setSaving] = useState(false)
    // const [saved, setSaved] = useState(false)
    


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
            return { __html: htmlChordSheet}
        }
    }

    const handleSave = () => {
        console.log('saving')
        api.songs.editLyrics(props.song.id, lyrics)
        setSaving(true)
        setTimeout(() => {
           setSaving(false)
        //    setSaved(true)
        //    setTimeout(() => {
        //     setSaved(false)
        //    }, 1000)
        }, 1000)
       
    }

    const convertChordSheetToChordPro = (chordSheet) => {
        const parser = new ChordSheetJS.ChordSheetParser({ preserveWhitespace: false });
        const formatter = new ChordSheetJS.ChordProFormatter();
        const song = parser.parse(chordSheet);
        return formatter.format(song);
    };

    const ChordSheetTextViewer = (song) => {
        // const { song } = props;
        const textChordSheet = new ChordSheetJS.TextFormatter().format(song);
      
        return <textarea readOnly className="ChordSheetEditor" value={textChordSheet} />;
    };

    // const textChordSheet = () => {
    //     const parser = new ChordSheetJS.ChordProParser()
    //     const song = parser.parse(lyrics)
    //     const textChordSheet = new ChordSheetJS.TextFormatter().format(song);
    //     return <textarea readOnly className="ChordSheetEditor" value={textChordSheet} />
    // }

    return(
        <Fragment>
            <div>
                <h3>Edit {props.song.title}'s Lyrics</h3>
                {!hideText ? (
                    <textarea 
                        style={{width: '90%', height: '150px'}}
                        onChange={handleChange} 
                        defaultValue={props.song.lyrics}
                    />
                ) : (
                    null 
                ) }
                <br></br>
                {!hideText ? <Tooltip title="Hide Editor"><ArrowUpwardIcon onClick={handleHideText}  /></Tooltip> : <ArrowDownwardIcon onClick={handleHideText}  /> }
                {!hideText ? <Tooltip title="Save"><SaveIcon onClick={handleSave} /></Tooltip> : null}{ saving ? 'Saved!' : null }
                
            </div>
            <div>
                <h3>{props.song.title} Lyrics</h3>
                <div
                    style={{width: '100%', height: '100%', fontFamily: 'monospace', font:'Lucida Console'}}
                    className={'chord-output'}
                    dangerouslySetInnerHTML={getChordMarkup()}
                />
                
            </div>
            
        </Fragment>
    )
}
export default ChordEditor 