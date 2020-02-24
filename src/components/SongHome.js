import React, { Component } from 'react'
import { api } from "../services/api";
import NewRecordingDevice from './NewRecordingDevice'
import RecordingDevice from './RecordingDevice'
import Player from './Player'

class SongHome extends Component {

    constructor(){
        super()
        this.state = {
            versions: []
        }
    }

    componentDidMount(){
        this.fetchVersions()
    }


    fetchVersions = () => {
        api.versions.getSongVersions(this.props.match.params.id)
        .then(res => res.json())
        .then(data => this.setState({ versions: data }))
    }

    addVersion = version => {
        this.setState(prevState => ({ versions: [...prevState.versions, version]}))
        this.renderVersions()
    }

    renderVersions = () => {
        return this.state.versions.map(version => {
            return (
                <div key={version.id} > {version.title} <Player recording={version.recording} /> </div>
            )
        })
    }


    render(){
        return (
            <div>
                <RecordingDevice onAddVersion={this.addVersion} songId={this.props.match.params.id}/>
                {this.renderVersions()}
            </div>
        )
    }

}

export default SongHome 