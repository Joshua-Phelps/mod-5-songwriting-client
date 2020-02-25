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
        // const splitStart = this.props.recording.url.split('arn://')
        // const url = splitStart[1].split('?')

        return(
            <div>
                <audio src={'https://jugtuttle-mod-5-project.s3-us-west-2.amazonaws.com/uploads/version/recording/71/audio1.wav'} controls />
                {/* <audio src={`https://${url[0]}`} controls /> */}
            </div>
        )
    }
}
export default Player
