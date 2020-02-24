import React, { Component, Fragment } from 'react';
import { ReactMediaRecorder } from "react-media-recorder"
import Button from '@material-ui/core/Button';
import ReactMicRecord from 'react-mic-record/lib/components/ReactMicRecord';
import AudioSpectrum from 'react-audio-spectrum'

class NewRecordingDevice extends Component {
    constructor(){
        super()
        this.state = {
            active: true,
            mediaRecorder: null,
            audioChunks: [],
            audioBlob: null,
            audioUrl: null,
            saved: false,
            audioCtx: null 
          }
    }

  componentDidMount(){
      this.prepareRecording()
  }

  prepareRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true})
    .then( stream => {
      const audioCtx = new AudioContext(stream)
      let mediaRecorder = new MediaRecorder(stream, {type: 'audio/wav'})
      this.setState({ mediaRecorder: mediaRecorder, audioCtx: audioCtx})
    })
  }


  startRecording = () => {
    this.state.mediaRecorder.start()
    this.setState({ active: true})
    this.state.mediaRecorder.addEventListener('dataavailable', e => {
      this.state.audioChunks.push(e.data)
    })
  }

  stopRecording = () => {
    this.state.mediaRecorder.stop()
    this.state.mediaRecorder.addEventListener('stop', () => {
      let audioBlob = new Blob(this.state.audioChunks, {type: 'audio'})
      let audioUrl = URL.createObjectURL(audioBlob)
      this.setState({ audioBlob: audioBlob, audioUrl: audioUrl})
    })
    this.setState({ active: false })
  }

  emergencyStop = () => {
    if (this.state.active === true) {this.state.mediaRecorder.stop()}
    this.setState({ mediaRecorder: null, audioBlob: [], audioUrl: null, active: false})
  }

  createFileFromBlob = () => {
      let file = new File([this.state.audioBlob], 'audio1.wav', {type: 'audio/wav'})
      return file 
  }

  postRecording = () => {
    let recording = this.createFileFromBlob()
    let formData = new FormData()
    formData.append("id", this.props.songId)
    formData.append('recording', recording)
      fetch(`http://localhost:3000/api/v1/versions`,{
        method: 'POST', 
        body: formData
    }).then(res => res.json()).then(json => console.log(json))
  }

  render(){
    return (
          <div>
              <audio src={this.state.audioUrl} controls />
              <br></br>
              <Button onClick={this.startRecording}>
                Rec.
              </Button>
              <Button onClick={this.stopRecording} >
                Stop
              </Button>
              <Button onClick={this.handlePlay}>
                  Play 
              </Button>
              <Button onClick={() => this.postRecording(this.props.assignmentID)}>
                Save
              </Button>
        </div>
    )
  }
}
export default NewRecordingDevice
