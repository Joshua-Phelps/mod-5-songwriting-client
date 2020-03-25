import React, { Fragment } from 'react'
import ChordEditor from './ChordEditor'

function LyricSheet (props) {
 
    return(
        <Fragment>
            <ChordEditor openRecording={props.openRecording} song={props.song} />
        </Fragment>     
    )
}
export default LyricSheet