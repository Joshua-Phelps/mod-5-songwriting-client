import React, { Component } from "react"

class Player extends Component {


    render(){
        // const splitStart = this.props.recording.url.split('arn://')
        // const url = splitStart[1].split('?')

        return(
            <div className='recording-holder'>
                {/* <audio src={`https://${url[0]}`} preload="auto" controls /> */}
                <audio src={``} controls />
            </div>
        )
    }
}
export default Player
