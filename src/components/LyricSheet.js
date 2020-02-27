import React, { Fragment } from 'react'
import ChordEditor from './ChordEditor'

function LyricSheet (props) {
 
    return(
        <Fragment>
            <ChordEditor song={props.song} />
        </Fragment>     
    )
}
export default LyricSheet