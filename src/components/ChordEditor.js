import React, { Fragment, useState } from 'react'
import ChordSheetJS from 'chordsheetjs'
import SaveIcon from '@material-ui/icons/Save';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { api } from '../services/api';
import Tooltip from '@material-ui/core/Tooltip';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


function ChordEditor(props){
    const classes = useStyles();
    const [lyrics, setLyrics] = useState('')
    const [hideText, setHideText] = useState(false)
    const [saving, setSaving] = useState(false)

    const handleChange = e => {
        setLyrics(e.target.value)
    }

    const handleHideText = () => {
        setHideText(!hideText)
    }
    
    const getChordMarkup = () => {
        if (lyrics !== ''){
            const parser = new ChordSheetJS.ChordProParser()
            const song = parser.parse(lyrics)
            if (song.lines[0].items.length !== 0){
                const htmlChordSheet = new ChordSheetJS.HtmlTableFormatter().format(song)
                return { __html: htmlChordSheet}
            }
        } 
    }

    const handleSave = () => {
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
                <>
                    <Tooltip title="Hide Editor"><ArrowUpwardIcon className={classes.text} onClick={handleHideText}  /></Tooltip>
                    {!saving ? <Tooltip title="Save"><SaveIcon className={classes.text} onClick={handleSave} /></Tooltip> : <span className={classes.text}>Saved!</span> }
                    <h3 className={classes.text}>Lyric Editor</h3>

                    <TableContainer className={classes.table}>
                    <textarea 
                            onChange={handleChange} 
                            defaultValue={lyrics ? lyrics : props.song.lyrics}
                            className={classes.editLyrics}
                        />
                    </TableContainer>
                </>
                ) : ( 
                    <ArrowDownwardIcon className={classes.text} onClick={handleHideText}  />        
                )}
            </div>
            <div className={classes.maxWidth} >
                <h3 className={classes.text}>{props.song.title} Lyrics</h3>
                <TableContainer className={ props.openRecording ? ( hideText ? classes.table4 : classes.table3 ) : classes.table2 }>
                <div
                    className={classes.displayLyrics}
                    // style={{width: '100%', height: '100%', color: "white", fontFamily: 'monospace', fontSize:'150%'}}        
                    dangerouslySetInnerHTML={getChordMarkup()}
                    
                />            
                </TableContainer>         
            </div>
        </Fragment>
    )
}
export default ChordEditor 

const useStyles = makeStyles(theme => ({
    text: {
      color: 'white'
    },
    editLyrics: {
      width: '100%', 
      height: '150px', 
      color: 'white', 
      fontSize: '120%',
      backgroundColor: theme.palette.primary.dark
    },
    table: {
      overFlow: 'auto'
    },
    table2: {
      overFlow: 'auto', 
      overFlowX: 'auto', 
    //   maxHeight: '365px',
      maxHeight: '40vh',
      backgroundColor: theme.palette.primary.dark
    },
    table3: {
        overFlow: 'auto', 
        overFlowX: 'auto', 
        maxHeight: '20vh',
        backgroundColor: theme.palette.primary.dark
    },
    table4: {
        overFlow: 'auto', 
        overFlowX: 'auto', 
        maxHeight: '10vh',
        backgroundColor: theme.palette.primary.dark
    },
    displayLyrics : {
      width: '100%', 
      height: '100%', 
      color: "white", 
      fontFamily: 'monospace', 
      fontSize:'150%'
    },
    maxWidth: {
      maxWidth: '100%'
    }
  }));
