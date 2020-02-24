import React, { Component } from 'react'

class CollectionForm extends Component {

    constructor(){
        super()
        this.state = {
            collectionName: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.onAddCollection(this.state.collectionName, this.props.user.id)
    }

    render(){
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input type='text' name='collectionName' value={this.state.collectionName} onChange={this.handleChange}></input>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default CollectionForm 