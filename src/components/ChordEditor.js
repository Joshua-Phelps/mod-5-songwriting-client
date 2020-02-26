import React, { Fragment, useState, useEffect } from 'react'
import ChordSheetJS from 'chordsheetjs'
import SaveIcon from '@material-ui/icons/Save';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { api } from '../services/api';

function ChordEditor(props){
    const [lyrics, setLyrics] = useState(``)
    const [hideText, setHideText] = useState(false)
    

    const handleChange = e => {
        setLyrics(e.target.value)
    }

    const handleHideText = () => {
        setHideText(!hideText)
    }
    


    const getChordMarkup = () => {
        // const formatter = new ChordSheetJS.HtmlFormatter()
        const formatter = new ChordSheetJS.HtmlDivFormatter();
        const parser = new ChordSheetJS.ChordProParser()
        const song = parser.parse(lyrics)
        return { __html: formatter.format(song)}
    }

    const handleSave = () => {
        console.log('saving')
        api.songs.editLyrics(props.song.id, lyrics)
    }

    return(
        <Fragment>
            <div>
                <h3>Edit Lyrics</h3>
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
                {!hideText ? <ArrowUpwardIcon onClick={handleHideText}  /> : <ArrowDownwardIcon onClick={handleHideText}  /> }
                {!hideText ? <SaveIcon onClick={handleSave} /> : null}
                
            </div>
            <div>
                <h3>{props.song.title} Lyrics</h3>
                <div
                    style={{width: '100%', height: '100%', fontFamily: 'monospace'}}
                    className={'chord-output'}
                    dangerouslySetInnerHTML={getChordMarkup()}
                />
                
            </div>
        </Fragment>
    )
}
export default ChordEditor 