import React, { Component, Fragment } from 'react';
import VersionForm from './VersionForm'
import AudioVisualizer from './AudioVisualizer'
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import RedoIcon from '@material-ui/icons/Redo';
import Tooltip from '@material-ui/core/Tooltip';

class NewRecordingDevice extends Component {
    constructor(){
        super()
        this.state = {
            active: false,
            mediaRecorder: null,
            audioChunks: [],
            audioBlob: null,
            audioUrl: null,
            audioCtx: null,
          }
    }

  componentDidMount(){
      this.prepareRecording()
  }

  componentWillUnmount(){
    this.emergencyStop()
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
    this.setState({ mediaRecorder: null, audioBlob: null, audioUrl: null, active: false})
  }

  createFileFromBlob = (title) => {
      let file = new File([this.state.audioBlob], title , {type: 'audio/wav'})
      return file 
  }

  reset = () => {
    this.setState({ audioChunks: [], audioBlob: null, audioUrl: null })
  }

  save = (title) => {
    let recording = this.createFileFromBlob(title)
    let formData = new FormData()
    formData.append("id", this.props.songId)
    formData.append('recording', recording)
    formData.append('title', title)
      fetch(`http://localhost:3000/api/v1/versions`,{
        method: 'POST', 
        body: formData
    })
    .then(res => res.json()).then(json => this.props.onAddVersion(json))
    .then(() => this.emergencyStop()).then(() => this.prepareRecording())
  }

  render(){
    const { audioBlob, active, audioUrl } = this.state
    return (
          <div className='recording-holder'>
              { active ? (
                <Tooltip title="Recording">
                  <div id="container" onClick={this.stopRecording}>
                    <div class="circle2">
                    </div>            
                  </div>
                </Tooltip>
              ) : <Tooltip title="Record"><MicIcon onClick={this.startRecording} /></Tooltip>}
              {audioBlob ? <Tooltip title="Redo"><RedoIcon onClick={this.reset} /></Tooltip>  : null}
              {audioBlob ? <Tooltip title="Save"><VersionForm onSave={this.save} /></Tooltip> : null}
              <br></br>
              <audio src={audioUrl} controls  />
        </div>
    )
  }
}
export default NewRecordingDevice
