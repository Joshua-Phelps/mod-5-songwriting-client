import React, { Component } from "react"
import ReactMicRecord from 'react-mic-record';

class Player extends Component {

    constructor(){
        super()
        this.state = {
            audio: '',
            play: false
        }
    }

    pause = () => {
        this.state.audio.pause()
      }

      play = () => {
        this.state.audio.play()
      }


    render(){
        return(
            <div>
                <audio src={this.props.recording.url} controls />
            </div>
        )
    }
}
export default Player
