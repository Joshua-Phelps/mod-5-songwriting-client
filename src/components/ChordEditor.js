import React, { Fragment, useState } from 'react'

function ChordEditor(props){
    const [lyrics, setLyrics] = useState('')

    const hanldeChange = e => {
        setLyrics(e.target.value)
    }

    return(
        <Fragment>

        </Fragment>
    )
}
export default ChordEditor 