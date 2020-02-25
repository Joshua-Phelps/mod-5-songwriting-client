import React, { Component } from "react"
import ReactMicRecord from 'react-mic-record';
import { api } from "../services/api";
import Button from '@material-ui/core/Button';
import VersionForm from './VersionForm'


class RecordingDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
          record: false,
          recordingURL: '',
          play: false,
          audio: null,
          blob: null, 
        }
      }

     
      startRecording = () => {
        this.setState({
          record: true
        });
      }
     
      stopRecording = () => {
        this.setState({
          record: false
        });
      }
     
      onData(e) {
        // console.log('chunk of real-time data is: ', recordedBlob);
        // console.log(recordedBlob['blobURL'])
      }
     
      onStop = (recordedBlob) => {
        this.stopRecording(recordedBlob)
        this.setState({
            recordingURL: recordedBlob['blobURL'],
            audio: new Audio(recordedBlob['blobURL']),
            blob: recordedBlob
        })

      }

      togglePlay = () => {
          this.setState(prevState => ({
              play: !prevState.play
          }), () => {
            this.state.play ? this.state.audio.play() : this.state.audio.pause()
          })
      }

      pause = () => {
        this.state.audio.pause()
      }

      play = () => {
        this.state.audio.play()
      }

      createFileFromBlob = () => {
        let file = new File([this.state.audioBlob], 'audio1.wav', {type: 'audio/wav'})
        return file 
    }

      save = (title) => {
        let recording = this.createFileFromBlob()
        let formData = new FormData() 
        formData.append("id", this.props.songId)
        formData.append('recording', recording)
        formData.append('title', title)
        fetch(`http://localhost:3000/api/v1/versions`,{
         method: 'POST', 
            body: formData
        }).then(res => res.json()).then(json => this.props.onAddVersion(json))
      }

     
      render() {
        return (
          <div>
            <button onClick={this.startRecording} type="button">Start</button>
            <button onClick={this.stopRecording} type="button">Stop</button>
            <button onClick={this.togglePlay} type="button">Play</button>
            <button type="button"><VersionForm onSave={this.save} /></button>
            <ReactMicRecord
              record={this.state.record}
              className="sound-wave"
              onStop={this.onStop}
              onData={this.onData}
              strokeColor="#000000"
              backgroundColor="#ffa64d" />
              <br></br>
            {/* <Button onClick={this.openVersionForm} type="button">Save</Button> */}
            
            {/* <button onClick={this.save} type="button">Save</button> */}
          </div>
        )
    }
}

export default RecordingDevice