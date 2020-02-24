import React, { useState } from 'react'

function CollectionLibrary (props) {
    const [selectedCollectionId, setSelectedCollectionId] = useState('')


    const renderCollections = () => {
        if (props.user.collections){
            return props.user.collections.map(collection => {
                return (
                    <div key={collection.id} id={collection.id} onClick={this.handleClick}> 
                      - {collection.collection_name}
                    </div>
                )
            }) 
        }
    }

    const handleClick = (e) => {
        if (e.target.id !== 'allSongs'){
            const selectedSongs = props.user.songs.filter(song => song.collection_id === parseInt(e.target.id))
            // this.setState({
            //     collectionId: parseInt(e.target.id),
            //     songs: selectedSongs
            // })
        } else {
            console.log("hi")
            // this.setState({
            //     collectionId: null,
            //     songs: this.props.user.songs
            // })
        }
    }

    return(
        <div>
            {renderCollections()}
        </div>
    )
}

export default CollectionLibrary