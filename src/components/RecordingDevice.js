import React, { Component } from "react"
import ReactMicRecord from 'react-mic-record';
import { api } from "../services/api";
import Button from '@material-ui/core/Button';
import VersionForm from './VersionForm'
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SaveIcon from '@material-ui/icons/Save';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


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
        // let file = new File([this.state.audioBlob], 'audio1.wav', {type: 'audio/wav'})
        let file = new File([this.state.audio], 'audio1.wav', {type: 'audio/wav'})
        return file 
    }

      save = (title) => {
        let recording = this.createFileFromBlob()
        let formData = new FormData() 
        formData.append("id", this.props.songId)
        formData.append('recording', recording)
        formData.append('title', title)
        console.log(this.state.audio)
        console.log(recording)
        // fetch(`http://localhost:3000/api/v1/versions`,{
        //  method: 'POST', 
        //     body: formData
        // }).then(res => res.json()).then(json => this.props.onAddVersion(json))
      }

     
      render() {
        return (
          <div>
            <List component="nav" aria-label="mailbox folders">
              <ListItem >
                <ReactMicRecord
                style={{width: '10px'}}
                record={this.state.record}
                className="sound-wave"
                onStop={this.onStop}
                onData={this.onData}
                strokeColor="#000000"
                backgroundColor="#ccffe6" />
              </ListItem>
              <ListItem divider>
                {this.state.record ? <StopIcon onClick={this.stopRecording} /> : <MicIcon onClick={this.startRecording} /> }
                {(this.state.play) ? <PauseIcon onClick={this.togglePlay} /> : <PlayArrowIcon onClick={this.togglePlay} />}
                {this.state.audio ? <VersionForm onSave={this.save} /> : null}
              </ListItem>
            </List>
            {/* {this.state.record ? <StopIcon onClick={this.stopRecording} /> : <MicIcon onClick={this.startRecording} /> }
            {(this.state.play) ? <PauseIcon onClick={this.togglePlay} /> : <PlayArrowIcon onClick={this.togglePlay} />}
            {this.state.audio ? <VersionForm onSave={this.save} /> : null} */}
            {/* <ReactMicRecord
              record={this.state.record}
              className="sound-wave"
              onStop={this.onStop}
              onData={this.onData}
              strokeColor="#000000"
              backgroundColor="#ffa64d" />
              <br></br>
              {this.state.record ? <StopIcon onClick={this.stopRecording} /> : <MicIcon onClick={this.startRecording} /> }
              {(this.state.play) ? <PauseIcon onClick={this.togglePlay} /> : <PlayArrowIcon onClick={this.togglePlay} />}
              {this.state.audio ? <VersionForm onSave={this.save} /> : null} */}
          </div>
        )
    }
}

export default RecordingDevice