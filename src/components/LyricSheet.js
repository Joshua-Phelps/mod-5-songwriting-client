import React from 'react'
import ChordEditor from './ChordEditor'

function LyricSheet (props) {
 
    return(
        <>
            <ChordEditor openRecording={props.openRecording} song={props.song} />
        </>     
    )
}
export default LyricSheet