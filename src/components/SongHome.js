import React, { Component } from 'react'
import { api } from "../services/api";
import RecordingDevice from './RecordingDevice'

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

    renderVersions = () => {
        return this.state.versions.map(version => {
            return (
                <div> <RecordingDevice /> {version.title} {version.recording.url} </div>
            )
        })
    }


    render(){
        return (
            <div>
                <RecordingDevice />
                {this.renderVersions()}
            </div>
        )
    }

}

export default SongHome 