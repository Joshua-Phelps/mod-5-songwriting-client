import React, { Component } from "react"

class Player extends Component {


    render(){
        const splitStart = this.props.recording.url.split('arn://')

        return(
            <div className='recording-holder'>
                <audio src={`http://${splitStart[1]}`} preload="auto" controls />
                {/* <audio src={this.props.recording.url} controls /> */}
            </div>
        )
    }
}
export default Player
