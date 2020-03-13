import React, { Component } from 'react';
import VersionForm from './VersionForm'
import MicIcon from '@material-ui/icons/Mic';
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
    // this.state.mediaRecorder.getTracks()[0].stop()
    this.emergencyStop()
  }

  prepareRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true})
    .then( stream => {
      let mediaRecorder = new MediaRecorder(stream, {type: 'audio/wav'})
      this.setState({ mediaRecorder: mediaRecorder})

    })
  }


  startRecording = () => {
    // this.prepareRecording()
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
    this.setState({ mediaRecorder: null, audioBlob: null, audioUrl: null, active: false, audioChunks: []})
  }

  clearState = () => {
    this.setState({ mediaRecorder: null, audioBlob: null, audioUrl: null, active: false, audioChunks: []})
  }

  createFileFromBlob = (title) => {
      let file = new File([this.state.audioBlob], title , {type: 'audio/wav'})
      return file 
  }

  clearAudioSrc = () => {
    const audioPlayer = document.getElementById('audio')
    audioPlayer.src = 'none'
  }

  reset = () => {
    this.clearAudioSrc()
    this.setState({ mediaRecorder: null, audioChunks: [], audioBlob: null, audioUrl: null })
    this.prepareRecording()
  }

  save = (title) => {
    this.clearAudioSrc()
    let recording = this.createFileFromBlob(title)
    let formData = new FormData()
    formData.append("id", this.props.songId)
    formData.append('recording', recording)
    formData.append('title', title)
      fetch(`https://song-control.herokuapp.com/api/v1/versions`,{
        method: 'POST', 
        body: formData
    })
    .then(res => res.json()).then(json => this.props.onAddVersion(json))
    .then(() => this.clearState()).then(() => this.prepareRecording())
    .catch(error => console.log(error))
  }

  render(){
    const { audioBlob, active, audioUrl } = this.state
    return (
          <div className='recording-holder'>
              { active ? (
                <Tooltip title="Recording">
                  <div className='loader' onClick={this.stopRecording}></div>
                </Tooltip>
              ) : <Tooltip title="Record"><MicIcon className='light-text' style={{color: '#cc0000'}} onClick={this.startRecording} /></Tooltip>}
              {audioBlob ? <Tooltip title="Redo"><RedoIcon className='light-text' onClick={this.reset} /></Tooltip>  : null}
              {audioBlob ? <VersionForm onSave={this.save} /> : null}
              <br></br>
              <audio id='audio' src={audioUrl} controls  />
        </div> 
    )
  }
}
export default NewRecordingDevice
